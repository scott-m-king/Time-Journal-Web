import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles, FormControlLabel, Switch } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { CategoryLane } from "../components/Categories/CategoryLane";
import { CategoryData } from "../components/Categories/CategoryData";
import { CategoryTable } from "../components/Categories/CategoryTable";
import { CategoryCalendar } from "../components/Categories/CategoryCalendar";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export const CategoryList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <Typography variant="h4">Categories</Typography>
        </Grid>
        <Grid item xs={1} style={{ textAlign: "right" }}>
          <AddCircleRoundedIcon />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <CategoryLane />
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label={checked ? "Switch to Pie Chart" : "Switch to Calendar"}
          />
          {checked ? <CategoryCalendar /> : <CategoryData />}
          <br />
          <CategoryTable />
        </Grid>
      </Grid>
    </div>
  );
};
