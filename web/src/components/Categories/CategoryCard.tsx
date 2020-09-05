import React, { useEffect } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
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
import clsx from "clsx";
import { Category } from "../../redux/types";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";

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

export interface CategoryCardProps {
  id: number;
  description: string;
  duration: number;
  totalDuration: number;
  barDuration: number;
  setActiveCategory(category: Category): void;
  activeCategory: Category | undefined;
}

export const CategoryCard = (category: CategoryCardProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (category.id === category.activeCategory?.id) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [category.activeCategory]);

  const selectCategory = () => {
    category.setActiveCategory({
      id: category.id,
      description: category.description,
      duration: category.duration,
    });
  };

  const handleOpenDelete = () => {
    setAnchorEl(null);
    setOpenDeleteDialog(true);
  };

  const handleOpenEdit = () => {
    setAnchorEl(null);
    setOpenEditDialog(true);
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
      <Card variant="outlined" className={classes.root} id="card">
        <CardHeader
          style={{
            background: `linear-gradient(90deg, ${
              theme.palette.primary.light
            } ${Math.round(percentageFill)}%, ${
              theme.palette.background.paper
            } ${Math.round(percentageFill)}%)`,
          }}
          avatar={
            <Avatar
              aria-label={category.description}
              style={{ backgroundColor: theme.palette.secondary.main }}
            >
              <b>{category.description.charAt(0).toUpperCase()}</b>
            </Avatar>
          }
          action={
            <div>
              {category.description !== "Uncategorized" ? (
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
                    <MenuItem onClick={handleOpenEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
                  </Menu>
                </div>
              ) : (
                ""
              )}
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
      <div>
        {openDeleteDialog ? (
          <DeleteCategoryDialog
            isOpen={openDeleteDialog}
            setIsOpen={setOpenDeleteDialog}
            category={category}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        {openEditDialog ? (
          <EditCategoryDialog
            isOpen={openEditDialog}
            setIsOpen={setOpenEditDialog}
            category={category}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
