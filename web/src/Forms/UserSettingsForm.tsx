import React from "react";
import { Formik, Form, FieldAttributes, useField } from "formik";
import classes from "*.module.css";
import { Paper, Grid, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

import * as yup from "yup";

interface UserSettingsFormProps {
  onSubmit: (data: any) => void;
}

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

const validationSchema = yup.object({});

export const UserSettingsForm: React.FC<UserSettingsFormProps> = ({
  onSubmit,
}) => {
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
