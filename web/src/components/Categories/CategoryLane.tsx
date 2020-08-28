import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";
import { Category } from "../../redux/types";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../redux/actions";
import { data } from './piechartData';

export const CategoryLane = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 165;

  const totalDuration = data
    .map((e) => e.duration)
    .reduce((rsf, currentValue) => rsf + currentValue);

  const barDuration = data
    .map((e) => e.duration)
    .reduce((rsf, currentValue) => Math.max(rsf, currentValue));

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    data.sort((a, b) => (a.duration > b.duration ? -1 : 1));
  }, []);

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  const dispatch = useDispatch();

  const onSelectCategory = (category: Category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <Grid
      container
      spacing={1}
      style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
    >
      {data.map((element) => {
        return (
          <Grid item xs={12} key={element.id}>
            <CategoryCard
              id={element.id}
              description={element.description}
              duration={element.duration}
              totalDuration={totalDuration}
              barDuration={barDuration}
              setActiveCategory={onSelectCategory}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
