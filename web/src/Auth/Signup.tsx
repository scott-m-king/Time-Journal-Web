import React from "react";
import { SignupForm } from "../Forms/SignupForm";
import {
  MeQuery,
  MeDocument,
  useLoginMutation,
  useRegisterUserMutation,
} from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { RouteComponentProps } from "react-router-dom";
import { Auth } from "../layouts/Auth";

export const Signup: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
  const [register] = useRegisterUserMutation();

  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      await register({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        },
      });

      const loginResponse = await login({
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

      if (loginResponse && loginResponse.data) {
        setAccessToken(loginResponse.data.login.accessToken);
      }

      history.push("/ok/dashboard");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Auth page="Sign up">
      <SignupForm onSubmit={handleRegister} />
    </Auth>
  );
};
