import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { CategoryCard } from "./CategoryCard";
import { Category } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/actions";
import { CategoryState } from "../../redux/reducers/categoriesReducer";
import { useGetUserCategoriesQuery } from "../../generated/graphql";

export const CategoryLane = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const MAX_HEIGHT = windowHeight - 165;
  const activeCategory = useSelector<
    CategoryState,
    CategoryState["selectedCategory"]
  >((state) => state.selectedCategory);
  const { loading, data: categoryData } = useGetUserCategoriesQuery();
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const [barDuration, setBarDuration] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  useEffect(() => {
    if (!loading && categoryData && categoryData.getUserCategories) {
      const arr = categoryData.getUserCategories
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
  }, [categoryData, loading]);

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
