# CapitalBikesProject

This is for a group project for POL706 at Georgetown University

## Tasks 

1. Create visualizations on the current data in `visualizations.Rmd`. 

This could graph weather verses departures, temperature vs departues, heat maps, and the other examples in `visualizations.Rmd`.

2. Widen hour_data on the column type for each station. 

This should produce two new columns to replace the column for each station. `example.Rmd` contains where to do this. For example `23rd_&_e_st_nw` should become `23rd_&_e_st_nw_dep` and `23rd_&_e_st_nw_arr` based on the `type` field. The other columns are all the same value for both rows (departure and arrival row for each station) and should be unchanged.

This will require a minor update for ridership when complete.

3. Clean up weather predictors.

Delete columns that have missing data or find out how to fill in that data. Some data is likely not needed (wind_direction for example)

4. Create models on the new data

5. Analyze results of models

6. Create final website to present results
