# CapitalBikesProject

This is for a group project for POL706 at Georgetown University

## Tasks 

1. ~~Prepare data + adding weather (EK) ~~ 

2. Create visualizations on the current data in `visualizations.Rmd`. 
	a. make initial viz (EB)
	b. improve/add to any existing visualizations
	c. think of whether we can do any maps?
	d. think of ways of showing the correlation with departures in other stations?

3. ~~Widen hour_data on the column type for each station (QX & FK)~~ 

4. Clean up weather predictors.
	a. delete variables we don't need (e.g. temperature max and min are the same as temperature so we don't need them)
	b. figure out a way to being in sunlight as a variable?
	c. create a variable for whether it rains or not (binary)
	d. also I think we should try this thing where for hours, month and weekday, we transform the variables so that 1 is the month/hour with lowest departures. This way, the numbers e.g. 1-12 for months have meaning. Happy to explain this, also more info here, which is exactly what this person did: https://towardsdatascience.com/predicting-no-of-bike-share-users-machine-learning-data-visualization-project-using-r-71bc1b9a7495 

5. feature engeneering 
	i. figure out what transformation to use for dependent variable for random forest (EB) - look into Box Cox transformation
	ii. understand how to select specific holidays in step holiday
	iii. also look at chapter he assigned for class hat talks about feature engeneering for 

6. Run models on the new data
	a. random forest (can try first with parameter tuning and then without)
		i. try a version where we  first do a random forest model to predict a binary variable of whether bikes are departing or not. Then use the predictions 		to create a new variable and estimate a random forest model that uses that variable as a predictor
	b. either Lasso, Ridge or Glymet (or multiple of these)
	c. xg boost (no idea what it is)

7. Analyze results of models

8. Create final website to present results
	a.  ~~  create website with index (EB) ~~ 
	b. set up structure and bare bones of template (EB)
