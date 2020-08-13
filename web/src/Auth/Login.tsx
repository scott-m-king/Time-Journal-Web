import React from "react";
import { LoginForm } from "./LoginForm";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { Home } from "../Home";

export const Login = () => {
  const [login] = useLoginMutation();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
        update: (store, { data }) => {
          if (!data) {
            return null;
          }
          store.writeQuery<MeQuery>({
            //updating the Apollo Cache
            query: MeDocument,
            data: {
              me: data.login.user,
            },
          });
        },
      });
      
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
      }

      window.location.href = "/home";
    } catch {
      alert("Invalid credentials.");
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};
