#' Returns a wider data set with times modified
#'
#' @param x A capital bikeshare dataset
#' @return The wider capital bikeshare dataset with grouping times to the hour
add_grouping_times <- function(x) {
  library(lubridate)

  result <- x %>%
    mutate(
      day = day(ymd_hms(time)),
      hour = hour(ymd_hms(time)),
      month = month(ymd_hms(time), label = TRUE),
      year = year(ymd_hms(time)),
      # hour_quarter = case_when(minute(ymd_hms(time)) < 15 ~ 1,
      #                          minute(ymd_hms(time)) < 30 ~ 2,
      #                          minute(ymd_hms(time)) < 45 ~ 3,
      #                          TRUE ~ 4)
    )

  return(result)
}

#' Returns a wider data set with times to serve as predictors
#'
#' @param x A capital bikeshare dataset with columns for month, day, hour
#' @return The wider capital bikeshare dataset with predictor times
add_predictor_times <- function(x) {
  library(lubridate)

  result <- x %>%
    mutate(
      weekday =
        day(make_datetime(year, match(month, month.abb), day, hour), label = TRUE),
      yearday =
        yday(make_datetime(year, match(month, month.abb), day, hour)),
    )

  return(result)
}

#' Returns a wider data set with a new date column
#'
#' @param x A capital bikeshare dataset with columns for month, day, hour
#' @return The wider capital bikeshare dataset with date
add_date_column <- function(x) {
  library(lubridate)

  result <- x %>%
    mutate(
      date = make_datetime(year, match(month, month.abb), day, hour)
    )
}