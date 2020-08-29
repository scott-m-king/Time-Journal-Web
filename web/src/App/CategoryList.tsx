import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  makeStyles,
  FormControlLabel,
  Switch,
  Theme,
  createStyles,
} from "@material-ui/core";
import { CategoryLane } from "../components/Categories/CategoryLane";
import { CategoryPieChart } from "../components/Categories/CategoryPieChart";
import { CategoryTable } from "../components/Categories/CategoryTable";
import { CategoryCalendar } from "../components/Categories/CategoryCalendar";
import { NewCategoryDialog } from "../components/Categories/NewCategoryDialog";
import { useSelector, useDispatch } from "react-redux";
import { CategoryState } from "../redux/reducers/categoriesReducer";
import {
  useGetAllUserEntriesQuery,
  useGetUserCategoriesQuery,
  Category,
} from "../generated/graphql";
import { setSelectedCategory } from "../redux/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export const CategoryList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const activeCategory = useSelector<
    CategoryState,
    CategoryState["selectedCategory"]
  >((state) => state.selectedCategory);
  const {
    loading: entryLoading,
    data: entryData,
  } = useGetAllUserEntriesQuery();
  const {
    loading: categoryLoading,
    data: categoryData,
  } = useGetUserCategoriesQuery();

  const handleChange = () => {
    setChecked((prev) => !prev);
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
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h4">Categories</Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: "right" }}>
          <NewCategoryDialog />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <CategoryLane
            activeCategory={activeCategory}
            categoryList={categoryData?.getUserCategories}
            setActiveCategory={onSelectCategory}
          />
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label={checked ? "Switch to Pie Chart" : "Switch to Calendar"}
          />
          {checked ? (
            <CategoryCalendar
              activeCategory={activeCategory}
              entries={entryData?.getAllUserEntries}
            />
          ) : (
            <CategoryPieChart
              activeCategory={activeCategory}
              categoryList={categoryData?.getUserCategories}
              setActiveCategory={onSelectCategory}
            />
          )}
          <br />
          <CategoryTable
            activeCategory={activeCategory}
            categories={categoryData?.getUserCategories}
            entries={entryData?.getAllUserEntries}
          />
        </Grid>
      </Grid>
    </div>
  );
};
