import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";

interface LaneProps {}

const array = [
  {
    id: 1,
    description: "Uncategorized",
    duration: 42 * 100,
  },
  {
    id: 2,
    description: "Sleep",
    duration: 350 * 100,
  },
  {
    id: 3,
    description: "Homework",
    duration: 90 * 100,
  },
  {
    id: 4,
    description: "Chill",
    duration: 100 * 100,
  },
  {
    id: 5,
    description: "Chores",
    duration: 70 * 100,
  },
  {
    id: 6,
    description: "Dishes",
    duration: 25 * 100,
  },
  {
    id: 7,
    description: "Exercise",
    duration: 5 * 100,
  },
  {
    id: 8,
    description: "Coding",
    duration: 200 * 100,
  },
  {
    id: 9,
    description: "Social",
    duration: 60 * 100,
  },
  {
    id: 10,
    description: "Family",
    duration: 70 * 100,
  },
];

export const CategoryLane: React.FC<LaneProps> = ({}) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 165;

  const totalDuration = array
    .map((e) => e.duration)
    .reduce((rsf, currentValue) => rsf + currentValue);

  const barDuration = array
    .map((e) => e.duration)
    .reduce((rsf, currentValue) => Math.max(rsf, currentValue));

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    array.sort((a, b) => (a.duration > b.duration ? -1 : 1));
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
      {array.map((element) => {
        return (
          <Grid item xs={12} key={element.id}>
            <CategoryCard
              id={element.id}
              description={element.description}
              duration={element.duration}
              totalDuration={totalDuration}
              barDuration={barDuration}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
