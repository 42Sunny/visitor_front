import React from "react";
import { Button, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "styles/Index.module.css";

const Index = () => (
  <Box className={styles.mainContainer}>
    <Typography variant="h2">42서울 방문 신청</Typography>
    <Link to="application" className={`${styles.link} link`}>
      <Button variant="contained" color="primary">
        <Typography variant="h5">방문 예약 신청</Typography>
      </Button>
    </Link>
    <Link to="login" className={`${styles.link} link`}>
      <Button variant="contained" color="primary">
        <Typography variant="h5">직원 로그인</Typography>
      </Button>
    </Link>
  </Box>
);

export default Index;
