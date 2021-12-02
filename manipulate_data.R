#' CBS data contains a single ride which includes where a bike left and where it arrived
#' For this reason, you cannot sort by time for both arrivals and departures
#' This function makes the data-set longer separating out departures and arrivals.
#'
#' @param x The CBS original data
#' @return Tibble with longer data_set separating departures and arrivals
sep_departures_from_arrivals <- function(x) {
  data_temp <- x %>%
    pivot_longer(c("started_at", "ended_at"), names_to = "type", values_to = "time") %>%
    # Creates a new column named station, to replace start_station_name and end_station_name
    # and it creates new columns likewise for coordinates and id.
    # Mutates the station name to be more readable.
    mutate(
      station = tolower(str_replace_all(ifelse(type == "started_at", start_station_name, end_station_name), pattern = " ", replacement = "_")),
      lat = ifelse(type == "started_at", start_lat, end_lat),
      lng = ifelse(type == "started_at", start_lng, end_lng),
      station_id = ifelse(type == "started_at", start_station_id, end_station_id),
    ) %>%
    select(-start_station_name, 
           -end_station_name, 
           -start_lat, 
           -end_lat, 
           -start_station_id, 
           -end_station_id, 
           -start_lng, 
           -end_lng) %>%
    # Rename the values from "started_at" and "ended_at" to "departure" and "arrival"
    mutate(type = ifelse(type == "started_at", "departure", "arrival")) %>% 

  return(data_temp)
}

#' Filters out all stations outside a given distance from a station
#'
#' @param x The long-data set produced by set_departures_from_arrivals
#' @param from_station The station name you want to filter by
#' @param distance The distance in meters
#' @return The dataset with the stations removed
filter_by_distance <- function(x, from_station, distance) {
  
  library(geosphere)
  
  station_row <- which(data$station == from_station)[1]
  from_lat = data$lat[station_row]
  from_lng = data$lng[station_row]
  
  return(x %>% 
    filter(distm(c(from_lng, from_lat), cbind(lng, lat)) < distance_m)
  )
}

#' Groups by station and by hour.
#' Each station will have two rows, one for departure and one for arrival
#' Each observation will have a type column to indicate if it is a departure or arrival
#' Each observation will have a count column for the number of departures and arrives
#' All NAs are replaced with zero since they have zero departures or arrivals
#' All stations renamed to lowercase and used underscores,
#'
#' @param x The data pivoted to sep arrivals from departures
#' @return Wide tibble with stations on columns grouped by hour.
get_station_hourly <- function(x) {
  source("times.R")
  hour_data_temp <- add_grouping_times(data) %>% 
    group_by(year, month, day, hour, station, type) %>% 
    summarize(count = n()) %>% 
    # Each station has its own row, this puts all the stations on one row
    pivot_wider(names_from = "station", values_from = "count") %>% 
    # Renames the type to make it plural since it is a count now
    mutate(type = ifelse(type == "departure", "departures", "arrivals")) %>% 
    # Replace NAs with 0
    mutate_all(~ifelse(is.na(.), 0, .)) %>% 
  
  return(hour_data_temp)
}

#' Create a dataset where a column named "ridership" contains the actual departures
#'  or arrivals for a station.
#' Every column with a station name is modified to be 14 day old data to be used as
#'  predictors.
#'
#' @param x A wide dataset grouped by time with all the stations as columns
#' @param station_name The name of the station you want to predict
#' @return The modified dataset for predicting time as described
setup_for_time_prediction  <- function(x, station_name) {
  
  # Create a new field called ridership that will be the actual riders on the 
  # given station
  ridership_data <- x %>% 
    mutate(ridership = NA)
  
  # This loop gets the values from the given station and puts it into the ridership
  # ridership column 14 days into the future. The goal is to couple the given station rides
  # with every station from 14 days ago for predictions.
  # When this is done running, the dates now represent future ridership, we need to shift
  # them 14 days into the future, so all the stations will be 14 day historic data.
  for (year in 2020:2021) {
    for (month in month.abb) {
      for (day in 1:31) {
        for (hour in 0:23) {
          dep_index_prev <- which(hour_data$year == year &
                                  hour_data$month == month &
                                  hour_data$day == day &
                                  hour_data$hour == hour &
                                  hour_data$type == "departures")
          
          if (length(dep_index_prev) > 0) {
            future_time <- make_datetime(year, match(month, month.abb), day, hour) + days(14)
            dep_index_future <- which(hour_data$year == year(future_time) &
                                      hour_data$month == (month.abb[month(future_time)]) &
                                      hour_data$day == day(future_time) &
                                      hour_data$hour == hour(future_time) &
                                      hour_data$type == "departures")
          
          if (length(dep_index_future) > 0) {
            # Get future ridership and pair it with 14 day ago rides.
            ridership_data$ridership[dep_index_prev] <- ridership_data[[station_name]][dep_index_future]
            }
          }
          
          arr_index_prev <- which(hour_data$year == year &
                                  hour_data$month == month &
                                  hour_data$day == day &
                                  hour_data$hour == hour &
                                  hour_data$type == "arrivals")
          
          if (length(arr_index_prev) > 0) {
            future_time <- make_datetime(year, match(month, month.abb), day, hour) + days(14)
            arr_index_future <- which(hour_data$year == year(future_time) &
                                      hour_data$month == (month.abb[month(future_time)]) &
                                      hour_data$day == day(future_time) &
                                      hour_data$hour == hour(future_time) &
                                      hour_data$type == "arrivals")
            
            if (length(arr_index_future) > 0) {
              ridership_data$ridership[arr_index_prev] <- ridership_data[[station_name]][arr_index_future]
            }
          }
        }
      }
    }
  }
  
  # Shift the dates 14 days into the future
  # I tried to do this with a map function, but ran into issues.
  for (index in 1:nrow(ridership_data)) {
    date <- make_datetime(ridership_data$year[index], 
                          match(ridership_data$month[index], month.abb), 
                          ridership_data$day[index])
    
    future_date <- date + days(14)
    
    ridership_data$year[index] = year(future_date)
    ridership_data$month[index] = month.abb[month(future_date)]
    ridership_data$day[index] = day(future_date)
  }
  
  return(ridership_data)
}

