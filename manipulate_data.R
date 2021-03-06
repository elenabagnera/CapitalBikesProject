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
    select(
      -start_station_name,
      -end_station_name,
      -start_lat,
      -end_lat,
      -start_station_id,
      -end_station_id,
      -start_lng,
      -end_lng
    ) %>%
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
filter_by_distance <- function(x, from_station, distance_m) {
  library(geosphere)

  station_row <- which(x$station == from_station)[1]
  from_lat <- x$lat[station_row]
  from_lng <- x$lng[station_row]

  return(x %>%
    filter(distm(cbind(from_lng, from_lat), cbind(lng, lat)) < distance_m))
}

#' Groups by station and by hour.
#' Each station will have two rows, one for departure and one for arrival
#' Each observation will have a type column to indicate if it is a departure or arrival
#' Each observation will have a count column for the number of departures and arrives
#' All NAs are replaced with zero since they have zero departures or arrivals
#' All stations renamed to lowercase and used underscores
#' Filters out Oct and Nov 2021 for weather data. This can be fixed if necessary
#'
#' @param x The data pivoted to sep arrivals from departures
#' @return Wide tibble with stations on columns grouped by hour.
get_station_hourly <- function(x) {
  source("times.R")
  hour_data_temp <- add_grouping_times(x) %>%
    group_by(year, month, day, hour, station, type) %>%
    summarize(count = n()) %>%
    # Make departure and arrival plural as it is now a count
    mutate(type = ifelse(type == "departure", "departures", "arrivals")) %>% 
    # Each station has its own row, this puts all the stations on one row
    pivot_wider(names_from = c("station", "type"), values_from = "count") %>% 
    # Replace NAs with 0
    mutate_all(~ ifelse(is.na(.), 0, .)) %>% 
    # There are a few Nov 2021 in the data that should not be there, probably returns
    #  I did not get October 31st weather for 2021. I can get it later if we need it.
    filter(!(year == 2021 & (month == "Oct" | month == "Nov")))

  return(hour_data_temp)
}

# The input is hour_data
# Last_date can be changed if you only want to go to a certain date.
fill_in_missing_rows <- function(x, last_date = make_date(2021, 9, 30)) {
  
  found_first <- FALSE
  for (year in 2020:2021) {
    for (month in month.abb) {
      for (day in 1:31) {
        for (hour in 0:23) {
          test_date <- make_datetime(year, match(month, month.abb), day, hour)
          # Test to make sure that day actually exists in the month
          if (test_date <= last_date && day(test_date) == day) {
            
            # find the row for the given hour
            index_prev <- which(hour_data$year == year &
              hour_data$month == month &
              hour_data$day == day &
              hour_data$hour == hour)

            # If that row exists...
            if (length(index_prev) > 0) {
              if (!found_first) {
                found_first <- TRUE
              } 
            } else {
              if (found_first) {
                x[nrow(x) + 1,] = append(list(year, month, day, hour), integer(length(x)-4))
              }
            }
          }
        }
      }
    }
  }
  
  
  return(x %>% arrange(year, month, day, hour))
}

#' Create a dataset where a column named "ridership" contains the actual departures
#'  or arrivals for a station.
#' Every other column is modified to be 14 day old data to be used as
#'  predictors.
#'
#' @param x A wide dataset grouped by time with all the stations as columns
#' @param station_name The name of the station you want to predict
#' @return The modified dataset for predicting time as described
setup_for_time_prediction <- function(x, station_name) {

  # Create a new field called ridership that will be the actual riders on the
  # given station
  lagged_data <- x %>%
    mutate(departures = NA, arrivals = NA)

  # This loop gets the values from the given station and puts it into the ridership
  # ridership column 14 days into the future. The goal is to couple the given station rides
  # with every station from 14 days ago for predictions.
  # When this is done running, the dates now represent future ridership, we need to shift
  # them 14 days into the future, so all the stations will be 14 day historic data.
  for (year in 2020:2021) {
    for (month in month.abb) {
      for (day in 1:31) {
        for (hour in 0:23) {
          # find the row for the given hour
          index_prev <- which(hour_data$year == year &
            hour_data$month == month &
            hour_data$day == day &
            hour_data$hour == hour)

          # If that row exists (it should)...
          if (length(index_prev) > 0) {
            future_time <- make_datetime(year, match(month, month.abb), day, hour) + days(14)
            
            # See if there is a row 14 days in the future, the last 14 days will not have one
            index_future <- which(hour_data$year == year(future_time) &
              hour_data$month == (month.abb[month(future_time)]) &
              hour_data$day == day(future_time) &
              hour_data$hour == hour(future_time))
            
            # If that future row is there...
            if (length(index_future) > 0) {
              # Get future departures and arrivals and pair it with 14 day ago rides.
              dep_column_name <- paste(station_name, "departures", sep = "_")
              arr_column_name <- paste(station_name, "arrivals", sep = "_")
              lagged_data$departures[index_prev[1]] <- lagged_data[[dep_column_name]][index_future[1]]
              lagged_data$arrivals[index_prev[1]] <- lagged_data[[arr_column_name]][index_future[1]]
            }
          }
        }
      }
    }
  }

  # Shift the dates 14 days into the future
  # I tried to do this with a map function, but ran into issues.
  for (index in 1:nrow(lagged_data)) {
    date <- make_datetime(
      lagged_data$year[index],
      match(lagged_data$month[index], month.abb),
      lagged_data$day[index]
    )

    future_date <- date + days(14)

    lagged_data$year[index] <- year(future_date)
    lagged_data$month[index] <- month.abb[month(future_date)]
    lagged_data$day[index] <- day(future_date)
  }

  return(lagged_data)
}

#' Adds weather to data grouped by hour
#'
#' @param x The data with year, month, day, hour
#' @return x with Attached weather
get_historic_weather <- function(x) {
  library(lubridate)

  weather <- read_csv("weather.csv") %>%
    rename_with(~ tolower(str_replace_all(., pattern = " ", replacement = "_"))) %>%
    mutate(time = mdy_hms(paste(date_time, "00", sep = ":"))) %>%
    add_grouping_times() %>%
    select(-date_time, -name, -time)
  # Filter out / mutate data here for NAs

  return(x %>%
    left_join(weather, by = c("year", "month", "day", "hour")))
}

format_weather <- function(x) {
  x %>% 
    mutate(conditions = case_when(
      grepl("Rain", conditions, fixed = TRUE) ~ "Bad",
      grepl("Snow", conditions, fixed = TRUE) ~ "Bad",
      conditions == "Overcast" ~ "Okay",
      TRUE ~ "Good"
    )) %>% 
    select(-visibility, 
           -relative_humidity, 
           -wind_chill, 
           -heat_index, 
           -wind_direction, 
           -wind_gust,
           -minimum_temperature,
           -maximum_temperature)
}

# Will modify the date column
add_sun_is_out <- function(x) {
  library(suncalc)
  library(lubridate)
  # Copy to a new dataframe to not modify the original
  y <- x
  mod_y <- y %>% 
    mutate(lat = 38.8893, 
           lon = -77.0502, 
           date = as.Date(paste(year, match(month, month.abb),day,sep="-"))) %>% 
    select(lat, lon, date)

  y_with_times <- getSunlightTimes(data = mod_y, keep = c("dawn", "dusk"), tz = "America/New_York") %>% 
      mutate(time = paste(date, "00:00:00", sep= " ")) %>% 
      add_grouping_times() %>% 
      select(year, month, day, dawn, dusk) %>% 
      unique()
  
  result <- left_join(x, y_with_times, by = c("year", "month", "day")) %>% 
    mutate(temp_date = make_datetime(year, match(month, month.abb), day, hour)) %>% 
    mutate(sun_is_out = ifelse(temp_date > ymd_hms(dawn) & temp_date < ymd_hms(dusk), 1, 0)) %>% 
    select(-temp_date, -dusk, -dawn)
  
  return(result)
}
