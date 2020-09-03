import React from "react";
import styled from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { Header } from "../components/Header";

const Root = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 12px;
  padding-right: 12px;
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
