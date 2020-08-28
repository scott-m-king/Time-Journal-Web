import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Colours } from "../../styles/Colours";
import clsx from "clsx";
import { Category } from "../../redux/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    title: {
      fontSize: 25,
    },
    pos: {
      marginBottom: 12,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      // transform: "rotate(180deg)",
    },
  })
);

interface CategoryCardProps {
  id: number;
  description: string;
  duration: number;
  totalDuration: number;
  barDuration: number;
  setActiveCategory(category: Category): void;
}

export const CategoryCard = (category: CategoryCardProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = React.useState(false);

  const selectCategory = () => {
    setExpanded(!expanded);
    category.setActiveCategory({
      id: category.id,
      description: category.description,
      duration: category.duration,
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const percentageFill = (category.duration / category.barDuration) * 100;

  return (
    <>
      <Card
        variant={expanded ? undefined : "outlined"}
        elevation={4}
        className={classes.root}
        id="card"
      >
        <CardHeader
          style={{
            background: `linear-gradient(90deg, ${
              Colours.primaryLight
            } ${Math.round(percentageFill)}%, #FFFFFF ${Math.round(
              percentageFill
            )}%)`,
          }}
          avatar={
            <Avatar
              aria-label="recipe"
              style={{ backgroundColor: Colours.secondary }}
            >
              {category.description.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <IconButton
                aria-label="more"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
              </Menu>
            </div>
          }
          title={
            <div>
              <Typography
                variant="h5"
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={selectCategory}
                aria-expanded={expanded}
              >
                {category.description}
              </Typography>
            </div>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body1" component="p">
              <b>{category.duration} mins</b> spent in total
            </Typography>
            <Typography variant="body1" component="p">
              <b>
                {category.duration >= 24 * 60
                  ? `${Math.floor(category.duration / (24 * 60))} days, `
                  : ""}
                {Math.floor((category.duration % (24 * 60)) / 60)} hours and{" "}
                {category.duration % 60} mins
              </b>{" "}
              spent in total
            </Typography>
            <Typography variant="body1" component="p">
              <b>
                {((category.duration / category.totalDuration) * 100).toFixed(
                  2
                )}
                %
              </b>{" "}
              of total time spent in this category
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
