#' Returns a wider data set with times modified
#'
#' @param x A capital bikeshare dataset
#' @return The wider capital bikeshare dataset
mutate_times <- function(x) {
  library(lubridate)
  
  result <- x %>% 
    mutate(day = day(ymd_hms(time)),
           hour = hour(ymd_hms(time)))
  
  return(result)
}