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
} from "@material-ui/core";
import * as yup from "yup";
import { Link } from "react-router-dom";

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

export const signupStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 600,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export const SignupForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = signupStyles();

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
                    <MyTextField placeholder="first name" name="firstName" />
                  </Grid>
                  <Grid item xs>
                    <MyTextField placeholder="last name" name="lastName" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <MyTextField placeholder="email" name="email" />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <MyTextField
                      placeholder="password"
                      name="password"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <MyTextField
                      placeholder="re-enter password"
                      name="passwordRepeat"
                      type="password"
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
                      Sign up
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={3} justify="center">
                  <Grid item>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Back to Log In
                    </Link>
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
