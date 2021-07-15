import React from "react";
import { Button, Typography, Box, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import styles from "styles/Index.module.css";
import logo42 from "images/42Seoul.png";

const useStyles = makeStyles({
  menuButton: {
    width: "10vh",
    height: "10vh",
    minWidth: "80px",
    minHeight: "80px",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  menuBox: {
    display: "flex",
    color: "white",
  },
  logo42: {
    width: "34vh",
    minWidth: "260px",
  },
  link: {
    margin: "1vh",
  }
});

const Index = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={styles.mainContainer}>
      <img src={logo42} alt="logo42" className={classes.logo42} />
      <Box className={classes.menuBox}>
        <Link to="application" className={`${styles.link} link`}>
          <Button variant="contained" className={classes.menuButton}>
            <Typography variant="subtitle2">
              방문
              <br />
              신청
            </Typography>
          </Button>
        </Link>
        <Button
          variant="contained"
          className={[classes.menuButton, classes.link]}
          onClick={() => {
            history.push("/check-reservation");
          }}
        >
          <Typography variant="subtitle2">
            방문
            <br />
            조회
          </Typography>
        </Button>
        <Button
          variant="contained"
          className={[classes.menuButton, classes.link]}
          disabled
          onClick={() => {
            history.push("/login");
          }}
        >
          <Typography variant="subtitle2">
            직원
            <br />
            로그인
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Index;
