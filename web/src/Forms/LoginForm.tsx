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
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const validationSchema = yup.object({
  email: yup.string().email().required("Email must be filled out."),
  password: yup.string().required("Password must be filled out."),
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
      type={type ? type : "text"}
      {...field}
      error={errorText !== ""}
      helperText={errorText}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
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
              <Grid container spacing={3} justify="center">
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={3} justify="center">
                <Grid item>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Form>
      )}
    </Formik>
  );
};
