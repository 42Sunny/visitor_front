import React from "react";
import AppRouter from "./AppRouter";
import { CssBaseline } from "@material-ui/core";
import "styles/Global.css";
import Background from "./Background";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Background />
      <AppRouter />
    </>
  )
};

export default App;
