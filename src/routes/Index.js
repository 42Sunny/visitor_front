import React from "react";
import { Button, Typography, Box, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "styles/Index.module.css";
import logo42 from "images/42Seoul.png";

const useStyles = makeStyles({
  menuButton: {
    width: "10vh",
    height: "10vh",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  menuBox: {
    display: "flex",
    color: "white",
  },
  logo42: {
    // backgroundColor: "black",
    width: "34vh",
  },
})

const Index = () => {
  const classes = useStyles();
  return (
  <Box className={styles.mainContainer}>
    <img src={logo42} alt="logo42" className={classes.logo42}/>
    <Box className={classes.menuBox}>
    <Link to="application" className={`${styles.link} link`}>
      <Button variant="contained" className={classes.menuButton}>
        <Typography variant="h5">방문 신청</Typography>
      </Button>
    </Link>
    <Link to="check-reservation" className={`${styles.link} link`}>
      <Button variant="contained" className={classes.menuButton}>
        <Typography variant="h5">방문 조회</Typography>
      </Button>
    </Link>
    <Link to="login" className={`${styles.link} link`}>
      <Button variant="contained" className={classes.menuButton}>
        <Typography variant="h5">직원<br/>로그인</Typography>
      </Button>
    </Link>
    </Box>
  </Box>
  )
  };

export default Index;
