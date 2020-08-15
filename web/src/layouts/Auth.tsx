import React from "react";
import styled from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { Header } from "../components/Header";

const Root = styled.div`
  padding-top: 80px;
  padding-left: 20px;
`;

export const Auth: React.FC<any> = ({ children }) => {
  return (
    <>
      <Header />
      <CssBaseline />
      <Root>{children}</Root>
    </>
  );
};
