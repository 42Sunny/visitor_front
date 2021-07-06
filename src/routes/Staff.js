import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box, makeStyles } from "@material-ui/core";
import styles from "styles/Staff.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from "react-router-dom";
import { getStateAvatar } from "tools/getStateAvatar";

const useStyles = makeStyles({
  staffBox: {
    margin: "auto",
    width: "800px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "20px",
    borderRadius: "20px",
    marginTop: "10vh",
  },
  checkList: {
    marginTop: "3vh",
  },
  checkElem: {
    display: "flex",
    height: "5vh",
    alignItems: "center",
    justifyContent: "center",
  },
  checkListTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkHeader: {
    marginBottom: "2vh",
  },
  checkListComment: {
    width: "100%",
    marginBottom: "1vh",
  },
  staffBtn: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  }
})

const Staff = ({ location }) => {
  const classes = useStyles();
  const staff = useState(
    decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY)
  )[0];
  const [data, setData] = useState(null);

  const getData = () => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    const data =
      reservations === null
        ? []
        : reservations.filter((reservation) => {
          return (
            reservation.staff.value === staff.value
          );
        });
    return data;
  };
  useEffect(() => {
    setData(getData());
  }, [staff]);

  return staff === undefined || data === null ? null : (
    <>
      <Box className={classes.staffBox}>
        <Box className={styles.title}>
          <Typography variant="h2">
            {`${staff.label}`}{" "}
          </Typography>
          <Box>
            <Link to={`/Reservation${location.search}`} className={`link`}>
              <Button variant="contained" className={classes.staffBtn}>
                <Typography variant="h6">방문 신청</Typography>
              </Button>
            </Link>
            <Link to={`/`} className={`link`}>
              <Button variant="contained" className={classes.staffBtn}>
                <Typography variant="h6">로그아웃</Typography>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className={classes.checkList}>
          {data.length === 0 ?
            <Box>
              <Typography variant="h4">예약이 없습니다.</Typography>
            </Box> :
            <>
              <Box className={classes.checkListComment}>상태를 클릭하여 상세 페이지로 이동할 수 있습니다.</Box>
              <Grid container spacing={1}>
                <Grid item xs={2} className={classes.checkListTitle}><Typography variant="h5">방문 날짜</Typography></Grid>
                <Grid item xs={3} className={classes.checkListTitle}><Typography variant="h5">입장 시간</Typography></Grid>
                <Grid item xs={3} className={classes.checkListTitle}><Typography variant="h5">퇴장 시간</Typography></Grid>
                <Grid item xs={2} className={classes.checkListTitle}><Typography variant="h5">방문 장소</Typography></Grid>
                <Grid item xs={2} className={classes.checkListTitle}><Typography variant="h5">상태</Typography></Grid>
              </Grid>

              {data.map((elem) => (
                <Grid container spacing={1} key={elem.id}>
                  <Grid item xs={2} className={classes.checkElem}><Typography variant="h6">{elem.enterDate}</Typography></Grid>
                  <Grid item xs={3} className={classes.checkElem}><Typography variant="h6">{elem.enterTime}</Typography></Grid>
                  <Grid item xs={3} className={classes.checkElem}><Typography variant="h6">{elem.exitTime}</Typography></Grid>
                  <Grid item xs={2} className={classes.checkElem}><Typography variant="h6">{elem.loc.label}</Typography></Grid>
                  <Grid item xs={2} className={classes.checkElem}>{getStateAvatar(elem.state)}</Grid>
                </Grid>
              ))}
            </>
          }
        </Box>
      </Box>
    </>
  );
};

export default Staff;
