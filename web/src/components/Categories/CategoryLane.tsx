import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";
import { Category } from "../../redux/types";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../redux/actions";
import { useGetUserCategoriesQuery } from "../../generated/graphql";

interface CategoryLaneProps {
  activeCategory: Category | undefined;
  categoryList: Category[] | undefined;
}

export const CategoryLane: React.FC<CategoryLaneProps> = ({
  activeCategory,
  categoryList,
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

  const dispatch = useDispatch();

  const onSelectCategory = (category: Category) => {
    if (
      (activeCategory && category.description !== activeCategory.description) ||
      !activeCategory
    ) {
      dispatch(setSelectedCategory(category));
    } else {
      dispatch(setSelectedCategory(undefined));
    }
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
              setActiveCategory={onSelectCategory}
              activeCategory={activeCategory}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
