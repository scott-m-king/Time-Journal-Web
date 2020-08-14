import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const Root = styled.div`
  padding-top: 90px;
  padding-left: 265px;
  padding-right: 25px;
  display: flex;
  min-height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }
`;

export const Body: React.FC<any> = ({ children }) => {
  return (
    <>
      <Root>
        <CssBaseline />
        <GlobalStyle />
        {children}
      </Root>
      <Sidebar />
      <Header />
    </>
  );
};
