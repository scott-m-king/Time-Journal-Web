import "date-fns";
import Button from "@material-ui/core/Button";
import { Form, Formik, Field } from "formik";
import * as React from "react";
import {
  TextField,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import * as yup from "yup";
import { useGetUserCategoriesQuery } from "../generated/graphql";
import { JournalEntry } from "../redux/types";
import { CalendarComponent } from "./CalendarComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers";
import { setEntryToEdit } from "../redux/actions";
import { NewCategoryDialog } from "../components/Categories/NewCategoryDialog";
import { createGlobalStyle } from "styled-components";

interface Category {
  id: number;
  description: string;
  duration: number;
}

interface Props {
  onSubmit: (values: JournalEntry) => Promise<void>;
  onEdit: (id: number, values: JournalEntry) => Promise<void>;
}

const validationSchema = yup.object({
  duration: yup.number().required("Duration must be filled out.").moreThan(0),
  title: yup.string().required("Entry must have a title."),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
    cssOutlinedInput: {
      "&$notchedOutline": {
        borderColor: `${theme.palette.primary.main}`,
      },
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: `${theme.palette.primary.main}`,
    },
    selectBorder: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme.palette.primary.main}`,
      },
    },
  })
);

const SelectStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
`;

export const CreateEntryForm: React.FC<Props> = ({ onSubmit, onEdit }) => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState<Array<Category>>([]);
  const { data, loading } = useGetUserCategoriesQuery();
  const [vals, setVals] = React.useState<JournalEntry>({
    date: new Date().toDateString(),
    categoryId: Infinity,
    duration: 0,
    title: "",
    notes: "",
  });
  const [editMode, setEditMode] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const entryToEdit = useSelector(
    (state: RootState) => state.editEntry.editEntry
  );
  const [addCategory, setAddCategory] = React.useState(false);

  React.useEffect(() => {
    if (!loading && data && data.getUserCategories) {
      setCategories(data.getUserCategories);

      setVals({
        date: new Date().toDateString(),
        categoryId: data.getUserCategories.reduce((arr, curr) => ({
          description: "",
          duration: 0,
          id: Math.max(arr.id, curr.id),
        })).id,
        duration: 0,
        title: "",
        notes: "",
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (entryToEdit) {
      setVals({
        date: entryToEdit.date,
        categoryId: entryToEdit.categoryId,
        duration: entryToEdit.duration,
        title: entryToEdit.title,
        notes: entryToEdit.notes,
      });
      setEditMode(true);
    }
  }, [entryToEdit, data]);

  const handleCancel = () => {
    setEditMode(false);
    setVals({
      date: new Date().toDateString(),
      categoryId: data!.getUserCategories[0].id,
      duration: 0,
      title: "",
      notes: "",
    });
    dispatch(setEntryToEdit(undefined));
  };

  const editEntry = async (updatedEntry: JournalEntry) => {
    onEdit(entryToEdit!.id!, updatedEntry);
    handleCancel();
  };

  return (
    <div>
      <Formik
        initialValues={vals}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (!entryToEdit) {
            onSubmit(data);
          } else {
            editEntry(data);
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <CalendarComponent name="date" />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Field
                      name="categoryId"
                      label="Category"
                      onChange={(e: any) => {
                        if (e.target.value === Infinity) {
                          setAddCategory(true);
                          setFieldValue(
                            "categoryId",
                            data!.getUserCategories[0].id
                          );
                        } else {
                          setFieldValue("categoryId", e.target.value);
                        }
                      }}
                      className={classes.selectBorder}
                      as={Select}
                    >
                      {categories.map((category, index) => {
                        return (
                          <MenuItem key={index} value={category.id}>
                            {category.description} - {category.duration} mins
                            spent
                          </MenuItem>
                        );
                      })}
                      <MenuItem value={Infinity}>Add new category...</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Field
                    type="number"
                    label="Duration"
                    name="duration"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">mins</InputAdornment>
                      ),
                      classes: {
                        root: classes.cssOutlinedInput,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    fullWidth
                    variant="outlined"
                    as={TextField}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Field
                    label="Title"
                    name="title"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    as={TextField}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Field
                    label="Additional notes (optional)"
                    name="notes"
                    multiline
                    fullWidth
                    rows={7}
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.cssOutlinedInput,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    as={TextField}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} justify="center">
                <Grid item>
                  {editMode ? (
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="outlined"
                          fullWidth
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Edit Entry
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          disabled={isSubmitting}
                          onClick={handleCancel}
                          variant="outlined"
                          fullWidth
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="outlined"
                    >
                      Add Entry
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
      <NewCategoryDialog isOpen={addCategory} setIsOpen={setAddCategory} />
    </div>
  );
};
