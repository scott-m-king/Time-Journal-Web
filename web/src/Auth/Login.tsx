import React from "react";
import { LoginForm } from "../Forms/LoginForm";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { RouteComponentProps } from "react-router-dom";
import { Auth } from "../layouts/Auth";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
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

      history.push("/ok/dashboard");
    } catch {
      alert("Invalid credentials.");
    }
  };

  return (
    <Auth>
        <LoginForm onSubmit={handleLogin} />
    </Auth>
  );
};
