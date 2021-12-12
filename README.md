# CapitalBikesProject

This is for a group project for POL706 at Georgetown University.

## Tasks 

1. ~~Prepare data + adding weather (EK) ~~ 

2. Create visualizations on the current data in `visualizations.Rmd`. 
	a. make initial viz (EB)
	b. improve/add to any existing visualizations (QX)
	c. think of whether we can do any maps?
	d. think of ways of showing the correlation with departures in other stations?
	(QX: This may be difficult to realize. There are too many stations to form a correlation matrix)

3. ~~Widen hour_data on the column type for each station (QX & FK)~~ 

4. Clean up weather predictors.
	a. delete variables we don't need (e.g. temperature max and min are the same as temperature so we don't need them) - Eric already deleted these
	b. figure out a way to being in sunlight as a variable?
	c. create a variable for whether it rains or not (binary) - Eric already did it
	d. also I think we should try this thing where for hours, month and weekday, we transform the variables so that 1 is the month/hour with lowest departures. This way, the numbers e.g. 1-12 for months have meaning. Happy to explain this, also more info here, which is exactly what this person did: https://towardsdatascience.com/predicting-no-of-bike-share-users-machine-learning-data-visualization-project-using-r-71bc1b9a7495 
	
**	This is code for how to do was not sure where is the best spot to insert this into the code
**	FK - 
	processedData$weeknum<-pmin(abs(3-processedData$weeknum),56-processedData$weeknum);  
	processedData$mnth<-pmin(abs(1-processedData$mnth),13-processedData$mnth);  
	processedData$hr<-pmin(abs(4-processedData$hr),28-processedData$hr);  

5. Feature engineering 
	a. figure out what transformation to use for dependent variable for random forest (EB) - look into Box Cox transformation
	    - FK: done and added. it basically makes variables look normal
	b. understand how to select specific holidays in step holiday
      - FK: added an example of how we can only choose a few holidays and not all- let us try with and without
  c. also look at chapter he assigned for class hat talks about feature engineering for 

6. Run models on the new data
	a. random forest (can try first with parameter tuning and then without)
		i. try a version where we first do a random forest model to predict a binary variable of whether bikes are departing or not.     Then use the predictions to create a new variable and estimate a random forest model that uses that variable as a predictor
	b. either Lasso, Ridge or Glymet (or multiple of these)
	c. xg boost (no idea what it is)

7. Analyze results of models

8. Create final website to present results
	a.  ~~  create website with index (EB) ~~ 
	b. set up structure and bare bones of template - I cannot update template anyone has ideas?