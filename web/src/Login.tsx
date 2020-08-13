import React from "react";
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <div>
      <LoginForm
        onSubmit={(data) => {
          console.log({
            email: data.email,
            password: data.password,
          });
        }}
      />
    </div>
  );
};
