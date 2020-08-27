import React from "react";
import {
  Typography,
  Grid,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";

interface CategoryCardMediaProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      padding: theme.spacing(1),
      textAlign: "center",
      whiteSpace: "nowrap",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export const CategoryCardMedia: React.FC<CategoryCardMediaProps> = ({}) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.box}>
          112 minutes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.box}>
          62 hours
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.box}>
          60% of total time spent
        </Typography>
      </Grid>
    </Grid>
  );
};
