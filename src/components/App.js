import React from "react";
import AppRouter from "./AppRouter";
import { CssBaseline } from "@material-ui/core";
import "styles/Global.css";

const App = () => {
  return (
    <>
      <CssBaseline />
      <AppRouter />
    </>
  )
};

export default App;
