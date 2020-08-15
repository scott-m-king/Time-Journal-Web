import "date-fns";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { Form, Formik, useField, FieldAttributes } from "formik";
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
import { Link } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface Values {
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
  email: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const validationSchema = yup.object({
  firstName: yup.string().required("First name must be filled out."),
  email: yup.string().email().required("Email must be filled out."),
  password: yup.string().required("Password must be filled out."),
  passwordRepeat: yup
    .string()
    .required("Please re-enter password.")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      label={placeholder}
      variant="outlined"
      fullWidth
      type={type}
      {...field}
      error={errorText !== ""}
      helperText={errorText}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "20px",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      width: "140%",
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
  const [category, setCategory] = React.useState("Uncategorized");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          passwordRepeat: "",
          email: "",
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
                      <KeyboardDatePicker
                        disableToolbar
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
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <TextField
                      label="Duration"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">Kg</InputAdornment>
                        ),
                      }}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        value={category}
                        onChange={handleChange}
                        label="Category"
                      >
                        <MenuItem value="Uncategorized">Uncategorized</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs>
                    <TextField
                      label="Description"
                      multiline
                      fullWidth
                      rows={4}
                      variant="outlined"
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
