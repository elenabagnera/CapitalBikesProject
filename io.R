#' Reads in all the .csv files in the folder and returns the merged
#' data set. Uses a variable cbs_data_temp. It will delete this variable
#'
#' @param x The path to the folder which contains the data
#' @return Tibble containing the data.
read_files <- function(path) {
  ## Loop through all the files and merge them into one tibble
  file_list <- list.files(path, pattern="tripdata.csv")
  rm(cbs_data_temp)
  
  for(file_name in file_list) {
    path <- paste("data/", file_name, sep="")
    
    new_data <- read_csv(path)
    
    if (exists("cbs_data_temp")){
      cbs_data_temp <- bind_rows(cbs_data_temp, new_data)
    } else {
      cbs_data_temp <- new_data
    }
  }
  
  return(cbs_data_temp)
}