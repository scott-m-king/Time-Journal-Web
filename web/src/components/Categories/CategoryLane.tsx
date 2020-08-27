import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";

interface LaneProps {}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CategoryLane: React.FC<LaneProps> = ({}) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 165;

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  return (
    <Grid
      container
      spacing={1}
      style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
    >
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
