import React from "react";
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
import {
  useGetAllUserEntriesQuery,
  useGetUserCategoriesQuery,
  Category,
} from "../generated/graphql";
import { setSelectedCategory, setCalendarView } from "../redux/actions";
import { RootState } from "../redux/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

export const CategoryList = () => {
  const classes = useStyles();
  const activeCategory = useSelector(
    (state: RootState) => state.activeCategory.selectedCategory
  );
  const calendarView = useSelector(
    (state: RootState) => state.calendarView.view
  );
  const {
    loading: entryLoading,
    data: entryData,
  } = useGetAllUserEntriesQuery();
  const {
    loading: categoryLoading,
    data: categoryData,
  } = useGetUserCategoriesQuery();
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(setCalendarView(!calendarView));
  };

  const onSelectCategory = (category: Category) => {
    if (
      (!entryLoading &&
        !categoryLoading &&
        activeCategory &&
        category.description !== activeCategory.description) ||
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
            control={<Switch checked={calendarView} onChange={handleChange} />}
            label={calendarView ? "Switch to Pie Chart" : "Switch to Calendar"}
          />
          {calendarView ? (
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
