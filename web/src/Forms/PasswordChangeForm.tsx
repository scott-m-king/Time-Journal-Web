import React from "react";
import { Formik, Form, FieldAttributes, useField } from "formik";
import {
  Paper,
  Grid,
  Button,
  TextField,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import * as yup from "yup";

interface UserSettingsFormProps {
  onSubmit: (data: any) => void;
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: 600,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

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

export const PasswordChangeForm: React.FC<UserSettingsFormProps> = ({
  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          passwordRepeat: "",
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
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <MyTextField
                    placeholder="password"
                    name="password"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <MyTextField
                    placeholder="re-enter password"
                    name="passwordRepeat"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3} justify="center">
                <Grid item xs={6}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                  >
                    Change password
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
