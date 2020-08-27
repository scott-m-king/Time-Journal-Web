import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  Grid,
  makeStyles,
  FormControlLabel,
  Switch,
  Button,
  Theme,
  createStyles,
} from "@material-ui/core";
import { CategoryLane } from "../components/Categories/CategoryLane";
import { CategoryPieChart } from "../components/Categories/CategoryPieChart";
import { CategoryTable } from "../components/Categories/CategoryTable";
import { CategoryCalendar } from "../components/Categories/CategoryCalendar";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export const CategoryList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography variant="h4">Categories</Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            color="default"
            className={classes.button}
            startIcon={<AddCircleIcon />}
          >
            Create New Category
          </Button>
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
          {checked ? <CategoryCalendar /> : <CategoryPieChart />}
          <br />
          <CategoryTable />
        </Grid>
      </Grid>
    </div>
  );
};
