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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface Values {
  date: Date;
  category: number;
  duration: number;
  title: string;
  description: string;
}

interface Props {
  onSubmit: (values: Values) => void;
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

const categories = [
  { id: 0, description: "Uncategorized" },
  { id: 12, description: "Sleep" },
  { id: 15, description: "School" },
  { id: 1, description: "Nevermind" },
];

export const CreateEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Formik
        initialValues={{
          date: selectedDate,
          category: 0,
          duration: 0,
          title: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          onSubmit(data);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        disableToolbar
                        name="date"
                        fullWidth
                        inputVariant="outlined"
                        format="MM/dd/yyyy"
                        label="Date"
                        margin="normal"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        as={KeyboardDatePicker}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Field name="category" label="Category" as={Select}>
                        {categories.map((category, index) => {
                          return (
                            <MenuItem key={index} value={category.id}>
                              {category.description}
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
                      label="Description (optional)"
                      name="description"
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
                      Submit
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
