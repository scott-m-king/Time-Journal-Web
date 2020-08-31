import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useField, useFormikContext, FieldAttributes } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersOverrides } from "@material-ui/pickers/typings/overrides";
import { Colours } from "../styles/Colours";

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};

declare module "@material-ui/core/styles/overrides" {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}

const defaultMaterialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: Colours.primary,
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: Colours.secondary,
      },
    },
  },
});

export const CalendarComponent: React.FC<FieldAttributes<{}>> = ({
  ...props
}) => {
  const [field] = useField<{}>(props);
  const { setFieldValue } = useFormikContext();

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
