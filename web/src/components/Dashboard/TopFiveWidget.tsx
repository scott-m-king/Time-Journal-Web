import React, { useEffect, useState } from "react";
import {
  createStyles,
  Theme,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Category } from "../../generated/graphql";
import { CircularProgress } from "@material-ui/core";
import { setSelectedCategory } from "../../redux/actions";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    inline: {
      display: "inline",
    },
    hover: {
      "&:hover": {
        backgroundColor: "rgba(144, 166, 178, 0.2)",
      },
    },
  })
);

interface TopFiveWidgetProps {
  categoryList: Category[] | undefined;
}

export const TopFiveWidget: React.FC<TopFiveWidgetProps> = ({
  categoryList,
}) => {
  const classes = useStyles();
  const [topFive, setTopFive] = useState<Array<Category>>([]);
  const [totalDuration, setTotalDuration] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryList !== undefined && categoryList !== null) {
      if (categoryList.length >= 1 && categoryList.length <= 5) {
        setTopFive(categoryList);
      }

      if (categoryList.length >= 5) {
        setTopFive(
          [...categoryList]
            .sort((x, y) => {
              return x.duration > y.duration ? -1 : 1;
            })
            .slice(0, 5)
        );
      }
      setTotalDuration(
        categoryList.reduce((acc, curr) => ({
          id: 0,
          description: "",
          duration: acc.duration + curr.duration,
        })).duration
      );
    }
  }, [categoryList]);

  const handleClick = (catId: number) => {
    const cat = categoryList!.find((cat) => cat.id === catId);
    dispatch(setSelectedCategory(cat));
  };

  return (
    <div style={{ textAlign: "center" }}>
      {categoryList ? (
        <List className={classes.root}>
          {topFive.map((category) => (
            <Link
              to="/ok/category_list"
              style={{ textDecoration: "none" }}
              onClick={() => handleClick(category.id)}
            >
              <TopFiveItem category={category} totalDuration={totalDuration} />
            </Link>
          ))}
        </List>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

interface ItemProps {
  category: Category;
  totalDuration: number;
}

const TopFiveItem: React.FC<ItemProps> = ({ category, totalDuration }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <ListItem alignItems="flex-start" className={classes.hover}>
        <ListItemAvatar>
          <Avatar
            aria-label={category.description}
            style={{ backgroundColor: theme.palette.secondary.main }}
          >
            <b>{category.description.charAt(0).toUpperCase()}</b>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={category.description}
          style={{ color: theme.palette.text.primary }}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {category.duration >= 24 * 60
                  ? `${Math.floor(category.duration / (24 * 60))} days, `
                  : ""}
                {Math.floor((category.duration % (24 * 60)) / 60)} hours and{" "}
                {category.duration % 60} mins
              </Typography>
              <b>
                {" - " + ((category.duration / totalDuration) * 100).toFixed(2)}
                %
              </b>{" "}
              of total time spent in this category
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};
