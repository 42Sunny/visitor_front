import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box, Container } from "@material-ui/core";
import GridCard from "components/GridCard";
import { staffSuffix } from "data/staff";
import styles from "styles/Staff.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from "react-router-dom";

const Staff = ({ location, history }) => {
  const staff = useState(
    decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY)
  )[0];
  const [data, setData] = useState(null);

  const getWaitingData = () => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    const data =
      reservations === null
        ? []
        : reservations.filter((reservation) => {
            return (
              reservation.staff.value === staff.value &&
              reservation.state === "wait"
            );
          });
    return data;
  };

  useEffect(() => {
    setData(getWaitingData());
  }, [staff]);

  const handleAccept = (key) => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    for (let idx = 0; idx < reservations.length; idx++) {
      if (
        `${reservations[idx].enterDate} - ${reservations[idx].exitTime}` === key
      ) {
        reservations[idx].state = "accept";
        break;
      }
    }
    window.localStorage.setItem("reservation", JSON.stringify(reservations));
    setData(getWaitingData());
  };

  const handleReject = (key) => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    for (let idx = 0; idx < reservations.length; idx++) {
      if (
        `${reservations[idx].enterDate} - ${reservations[idx].exitTime}` === key
      ) {
        reservations[idx].state = "reject";
        break;
      }
    }
    window.localStorage.setItem("reservation", JSON.stringify(reservations));
    setData(getWaitingData());
  };

  return staff === undefined || data === null ? null : (
    <>
      <Container maxWidth="sm">
        <Box className={styles.title}>
          <Typography variant="h2">
            {`${staff.label} ${staffSuffix[staff.role]}`}{" "}
          </Typography>
          <Link to={`/Reservation${location.search}`} className={`link`}>
            <Button color="primary" variant="contained">
              <Typography variant="h4">예약 신청</Typography>
            </Button>
          </Link>
        </Box>
        <Typography variant="h3">방문 신청</Typography>
        <Grid container className={styles.applicationContainer} spacing={2}>
          {data.map((element) => {
            const key = `${element.enterDate} - ${element.exitTime}`;
            return (
              <GridCard item xs={12} key={key}>
                <Box className={styles.applicationBox} fullWidth>
                  <Typography variant="h5">방문 날짜</Typography>
                  <Typography>
                    {element !== null && `${element.enterDate}`}
                  </Typography>
                </Box>
                <Box className={styles.applicationBox} fullWidth>
                  <Typography variant="h5">입장 시간</Typography>
                  <Typography>
                    {element !== null && `${element.enterTime}`}
                  </Typography>
                </Box>
                <Box className={styles.applicationBox} fullWidth>
                  <Typography variant="h5">퇴장 시간</Typography>
                  <Typography>
                    {element !== null && `${element.exitTime}`}
                  </Typography>
                </Box>
                <Box className={styles.applicationBox} fullWidth>
                  <Typography variant="h5">방문 대상</Typography>
                  <Typography>
                    {element !== null &&
                      element.staff !== null &&
                      `${element.staff.label} ${
                        staffSuffix[element.staff.role]
                      }`}
                  </Typography>
                </Box>
                <Box className={styles.applicationBox} fullWidth>
                  <Typography variant="h5">방문자 이름</Typography>
                  <Typography>
                    {element !== null && `${element.userName}`}
                  </Typography>
                </Box>
                <Box className={styles.applicationBox} fullWidth>
                  <Typography variant="h5">방문 목적</Typography>
                  <Typography>
                    {element !== null && `${element.purpose}`}
                  </Typography>
                </Box>
                <Box className={styles.applicationBtns} fullWidth>
                  <Button color="primary" variant="contained">
                    <Typography variant="h5" onClick={() => handleAccept(key)}>
                      수락
                    </Typography>
                  </Button>
                  <Button color="primary" variant="contained">
                    <Typography variant="h5" onClick={() => handleReject(key)}>
                      거절
                    </Typography>
                  </Button>
                </Box>
              </GridCard>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Staff;
