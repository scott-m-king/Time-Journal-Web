import React, { useEffect } from "react";
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
import { red } from "@material-ui/core/colors";
import clsx from "clsx";

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
    avatar: {
      backgroundColor: red[500],
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
}

export const CategoryCard = (category: CategoryCardProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [width, setWidth] = React.useState<undefined | number>(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
  }, []);

  const updateWindowDimensions = () => {
    setWidth(document.getElementById("card")?.offsetWidth);
  };

  const percentageFill = (category.duration / category.totalDuration) * 100;

  return (
    <>
      <Card
        variant={expanded ? "elevation" : "outlined"}
        elevation={4}
        className={classes.root}
        id="card"
        style={{
          background: `linear-gradient(90deg, #d1edff ${Math.round(
            percentageFill
          )}%, #FFFFFF ${Math.round(percentageFill)}%)`,
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{ backgroundColor: red[500] }}>
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
                component="p"
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
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
              <b>{(category.duration / 60).toFixed(2)} hours</b> spent in total
            </Typography>
            <Typography variant="body1" component="p">
              <b>56%</b> of total time spent in this category
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
