import React from "react";
import AppRouter from "./AppRouter";
import { Box, CssBaseline, makeStyles } from "@material-ui/core";
import "styles/Global.css";
import Background from "./Background";
import Version from "./Version";

const useStyles = makeStyles({
  appContainer: {
    height: "100vh",
  }
})

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.appContainer}>
        <CssBaseline />
        <AppRouter />
      </Box>
      <Background />
      <footer>
        <Version />
      </footer>
    </>
  )
};

export default App;
