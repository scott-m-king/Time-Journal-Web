import React from "react";
import { SignupForm } from "./SignupForm";

export const Signup = () => {
  return (
    <div>
      <SignupForm
        onSubmit={(data) => {
          console.log({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            passwordRepeat: data.passwordRepeat,
          });
        }}
      />
    </div>
  );
};
