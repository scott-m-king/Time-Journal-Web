import React, { useEffect, useState } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";

export const App = () => {
  const [loadPage, setLoadPage] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoadPage(false);
    });
  }, []);

  if (loadPage) {
    return <div>loading...</div>;
  }

  return <Routes />;
};
