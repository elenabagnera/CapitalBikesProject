#' Returns a wider data set with times modified
#'
#' @param x A capital bikeshare dataset
#' @return The wider capital bikeshare dataset
mutate_times <- function(x) {
  library(lubridate)
  
  result <- x %>% 
    mutate(start_day_of_month = day(ymd_hms(started_at)))
  
  return(result)
}