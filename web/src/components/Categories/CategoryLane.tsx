import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";

interface LaneProps {}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CategoryLane: React.FC<LaneProps> = ({}) => {
  return (
    <Grid container spacing={1}>
      {array.map((num, index) => {
        return (
          <Grid item xs={12}>
            <CategoryCard />
          </Grid>
        );
      })}
    </Grid>
  );
};
