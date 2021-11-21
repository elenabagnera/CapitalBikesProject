#' Returns a wider data set with times modified
#'
#' @param x A capital bikeshare dataset
#' @return The wider capital bikeshare dataset
mutate_times <- function(x) {
  library(lubridate)
  
  result <- x %>% 
    mutate(day = day(ymd_hms(time)),
           hour = hour(ymd_hms(time)),
           month = month(ymd_hms(time), label = TRUE),
           year = year(ymd_hms(time)),
           weekday = wday(ymd_hms(time), label = TRUE),
           yearday = yday(ymd_hms(time)),
           # hour_quarter = case_when(minute(ymd_hms(time)) < 15 ~ 1,
           #                          minute(ymd_hms(time)) < 30 ~ 2,
           #                          minute(ymd_hms(time)) < 45 ~ 3,
           #                          TRUE ~ 4)
           )
  
  return(result)
}