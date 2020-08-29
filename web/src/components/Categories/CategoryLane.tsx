import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";
import { Category } from "../../redux/types";

interface CategoryLaneProps {
  activeCategory: Category | undefined;
  categoryList: Category[] | undefined;
  setActiveCategory(category: Category): void;
}

export const CategoryLane: React.FC<CategoryLaneProps> = ({
  activeCategory,
  categoryList,
  setActiveCategory,
}) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 165;
  const [totalDuration, setTotalDuration] = useState(0);
  const [barDuration, setBarDuration] = useState(0);
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  useEffect(() => {
    if (categoryList) {
      const arr = categoryList
        .slice()
        .sort((a, b) => (a.duration > b.duration ? -1 : 1));

      setCategories(arr);

      setTotalDuration(
        arr
          .map((e) => e.duration)
          .reduce((rsf, currentValue) => rsf + currentValue)
      );

      setBarDuration(
        arr
          .map((e) => e.duration)
          .reduce((rsf, currentValue) => Math.max(rsf, currentValue))
      );
    }
  }, [categoryList]);

  const updateWindowDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  return (
    <Grid
      container
      spacing={1}
      style={{ maxHeight: MAX_HEIGHT, overflow: "auto" }}
    >
      {categories.map((element) => {
        return (
          <Grid item xs={12} key={element.id}>
            <CategoryCard
              id={element.id}
              description={element.description}
              duration={element.duration}
              totalDuration={totalDuration}
              barDuration={barDuration}
              setActiveCategory={setActiveCategory}
              activeCategory={activeCategory}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
