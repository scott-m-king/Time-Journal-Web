import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardHeader, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: red[500],
  },
});

interface CategoryCardProps {
  id: number;
  description: string;
  duration: number;
}

export const CategoryCard = (category: CategoryCardProps) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{ backgroundColor: red[500] }}>
            {category.description.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h5" component="p">
            {category.description}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" component="p">
          <b>{category.duration} mins</b> spent in total
        </Typography>
        <Typography variant="body1" component="p">
          <b>{(category.duration / 60).toFixed(2)} hours</b> spent in total
        </Typography>
        <Typography variant="body1" component="p">
          <b>56%</b> of total time spent in this category
        </Typography>
      </CardContent>
    </Card>
  );
};
