import React from "react";
import { useMeQuery } from "./generated/graphql";

interface HomeProps {}

export const Home = () => {
  const { data, loading } = useMeQuery();
  let body: any = null;

  if (loading) {
    body = "loading...";
  } else if (data && data.me) {
  body = <div>you are logged in as: {data.me.firstName} ({data.me.email})</div>;
  } else {
    body = <div>you are not logged in</div>;
  }
  return <div>{body}</div>;
};
