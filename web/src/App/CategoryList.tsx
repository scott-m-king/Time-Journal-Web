import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";
import { CategoryCard } from "../components/CategoryCard";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  root: {
    flexGrow: 1,
  },
});

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CategoryList = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Categories</Typography>
        </Grid>
        {array.map((num, index) => {
          return (
            <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={4}>
              <CategoryCard />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
