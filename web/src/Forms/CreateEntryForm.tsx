import "date-fns";
import Button from "@material-ui/core/Button";
import { Form, Formik, Field } from "formik";
import * as React from "react";
import {
  TextField,
  Paper,
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

interface Category {
  id: number;
  description: string;
  duration: number;
}

interface Props {
  onSubmit: (values: JournalEntry) => Promise<void>;
}

const validationSchema = yup.object({
  duration: yup.number().required("Duration must be filled out."),
  title: yup.string().required("Entry must have a title."),
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "20px",
      textAlign: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      width: "100%",
      color: theme.palette.text.secondary,
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: "25ch",
    },
  })
);

export const CreateEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();

  const [categories, setCategories] = React.useState<Array<Category>>([]);
  const [vals, setVals] = React.useState<JournalEntry>({
    date: new Date(),
    categoryId: 0,
    duration: 0,
    title: "",
    notes: "",
  });

  const { data, loading } = useGetUserCategoriesQuery();

  React.useEffect(() => {
    if (!loading && data && data.getUserCategories) {
      setCategories(data.getUserCategories);

      setVals({
        date: new Date(),
        categoryId: data.getUserCategories[0].id,
        duration: 0,
        title: "",
        notes: "",
      });
    }
  }, [data]);

  return (
    <div>
      <Formik
        initialValues={vals}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(data);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <CalendarComponent name="date" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Field name="categoryId" label="Category" as={Select}>
                        {categories.map((category, index) => {
                          return (
                            <MenuItem key={index} value={category.id}>
                              {category.description} - {category.duration} mins
                              spent
                            </MenuItem>
                          );
                        })}
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
                      as={TextField}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3} justify="center">
                  <Grid item>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="outlined"
                    >
                      Add Entry
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
