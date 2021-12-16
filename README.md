# Predicting Capital Bikes Departures through Supervised Machine Learning

This is for a group project for POL-706 at Georgetown University, Introduction to Data Science.

Team members: Eric Kitaif, Qi Xue, Farah Kaddah, Elena Bagnera

Website: https://elenabagnera.github.io/CapitalBikesProject/ 

## Project description

DC's Capital Bikeshare service has been increasing in popularity, especially during the COVID-19 pandemic, when Washingtonians needed alternatives for public transport. To date it has 5,000 bikes and 600+ stations across 7 jurisdictions. However, users find the service unreliable at times, especially at peak times. In this project, our goal is to use and optimize supervised machine learning models that can predict the number of ride-sharing bikes that will be used at any give hour. For simplicity, we apply our models to one station in particular that has particularly high demand due to its proximity to DC's greatest tourist attraction: the Lincoln Memorial station. As such, our target variable will be the number of bikes that departed from that station at a given hour.

We chose predictors that vary by the hour that we believe are relevant to individuals' choices of taking a capital Bikeshare bike. They are of three types:

* weather: this includes general weather conditions (categorical variable), rain, temperature, snow. 
* sunlight: this is a dummy variable for whether there is sunlight or not
* time: this includes day of the week, weekday, month, year, as well as selected holiday days.
* other stations: this includes departures from stations in an 2 mile radius

Being able to predict Capital Bikeshare demand, could result in a more efficient allocation of bikes when stations are re-stocked at night. It could also inform and it could inform the eventual expansion of stations across strategic locations across the city to improve the experience of Washingtonians.


## How to navigate this repository

* Data folder: contains original data taken from Capital Bikeshare's website 
* Docs folder: contains htmls used for building the project website 
* motivation.rmd: contains project motivation and overall details on the project and the data we use
* vleanup.rmd: contains a description of all of the data cleaning we did
* visualizatiom.rmd: contains all the visualizations run for EDA
* lasso, random forest and decision tree contain the code for each individual model
* random-forest-final: contains the evaluaiton of the best model for the discussion section of the websire
* Functions R files: io.R (merging all csvs contained in data), mainipulate_data. R(all functions used to manipulate data), times.R (functions specific to manipulating time-related variables)
* csv documents outside of Data folder were the result of the cleaning process 
* Any document that starts with "site-" is a duplicate of an already existing document that only includes what we decided to show on the website 

