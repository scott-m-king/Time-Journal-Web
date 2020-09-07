import React from "react";
import {
  createMuiTheme,
  useTheme,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useField, useFormikContext, FieldAttributes } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cssOutlinedInput: {
      color: theme.palette.text.primary,
    },
    notchedOutline: {
      borderWidth: "1px",
      borderColor: `${theme.palette.primary.main}`,
    },
  })
);

export const CalendarComponent: React.FC<FieldAttributes<{}>> = ({
  ...props
}) => {
  const [field] = useField<{}>(props);
  const { setFieldValue } = useFormikContext();

  const classes = useStyles();
  const theme = useTheme();

  const COLOR = theme.palette.text.secondary;

  // https://stackoverflow.com/questions/53764626/how-to-change-outline-color-of-material-ui-react-input-component
  const defaultMaterialTheme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        root: {
          position: "relative",
          "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: COLOR,
          },
          "&$focused $notchedOutline": {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&$focused": {
            color: theme.palette.primary.main,
          },
        },
      },
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: theme.palette.secondary.light,
        },
      },
      MuiPickersDay: {
        daySelected: {
          backgroundColor: theme.palette.secondary.main,
        },
      },
      MuiSvgIcon: {
        root: {
          fill: COLOR,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...field}
          autoOk
          name="date"
          inputVariant="outlined"
          variant="inline"
          format="MM/dd/yyyy"
          fullWidth
          label="Date"
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              notchedOutline: classes.notchedOutline,
            },
          }}
          InputLabelProps={{
            style: { color: theme.palette.text.secondary },
          }}
          onChange={(val) => setFieldValue(field.name, val)}
          margin="normal"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          InputAdornmentProps={{ position: "start" }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};
