import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, Box, Container } from "@material-ui/core";
import GridCard from "components/GridCard";
import { staffSuffix } from "data/staff";
import styles from "styles/Staff.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from "react-router-dom";

const Staff = ({ location }) => {
  const staff = useState(
    decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY)
  )[0];
  const [data, setData] = useState(null);
  const [acceptedData, setAcceptedData] = useState(null);

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

  const getAcceptedData = () => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    const data =
      reservations === null
        ? []
        : reservations.filter((reservation) => {
          return (
            reservation.staff.value === staff.value &&
            reservation.state === "accept"
          );
        });
    return data;
  };

  useEffect(() => {
    setData(getWaitingData());
    setAcceptedData(getAcceptedData());
  }, [staff]);

  const handleAccept = (key) => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    for (let idx = 0; idx < reservations.length; idx++) {
      if (
        reservations[idx].id === key
      ) {
        reservations[idx].state = "accept";
        break;
      }
    }
    window.localStorage.setItem("reservation", JSON.stringify(reservations));
    setData(getWaitingData());
    setAcceptedData(getAcceptedData());
  };

  const handleReject = (key) => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    for (let idx = 0; idx < reservations.length; idx++) {
      if (
        reservations[idx].id === key
      ) {
        reservations[idx].state = "reject";
        break;
      }
    }
    window.localStorage.setItem("reservation", JSON.stringify(reservations));
    setData(getWaitingData());
  };

  const handleFinish = (key) => {
    const reservations = JSON.parse(window.localStorage.getItem("reservation"));
    for (let idx = 0; idx < reservations.length; idx++) {
      if (
        reservations[idx].id === key
      ) {
        reservations[idx].state = "finish";
        break;
      }
    }
    window.localStorage.setItem("reservation", JSON.stringify(reservations));
    setAcceptedData(getAcceptedData());
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
              <Typography variant="h6">방문 예약</Typography>
            </Button>
          </Link>
          <Link to={`/`} className={`link`}>
            <Button color="secondary" variant="contained">
              <Typography variant="h6">로그아웃</Typography>
            </Button>
          </Link>
        </Box>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h4">방문 신청 대기</Typography>
            <Grid container className={styles.applicationContainer} spacing={2}>
              {data.map((element) => {
                const key = element.id;
                return (
                  <GridCard item xs={12} key={key}>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 날짜</Typography>
                      <Typography>
                        {element !== null && `${element.enterDate}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">입장 시간</Typography>
                      <Typography>
                        {element !== null && `${element.enterTime}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">퇴장 시간</Typography>
                      <Typography>
                        {element !== null && `${element.exitTime}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 장소</Typography>
                      <Typography>
                        {element !== null &&
                          element.loc !== null &&
                          `${element.loc.label} 클러스터`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 대상</Typography>
                      <Typography>
                        {element !== null &&
                          element.staff !== null &&
                          `${element.staff.label} ${staffSuffix[element.staff.role]
                          }`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문자 이름</Typography>
                      <Typography>
                        {element !== null && `${element.userName}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문자 번호</Typography>
                      <Typography>
                        {element !== null && `${element.userPhone}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 목적</Typography>
                      <Typography>
                        {element !== null && `${element.purpose}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBtns}>
                      <Button color="primary" variant="contained">
                        <Typography
                          variant="h5"
                          onClick={() => handleAccept(key)}
                        >
                          수락
                        </Typography>
                      </Button>
                      <Button color="secondary" variant="contained">
                        <Typography
                          variant="h5"
                          onClick={() => handleReject(key)}
                        >
                          거절
                        </Typography>
                      </Button>
                    </Box>
                  </GridCard>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h4">수락된 방문</Typography>
            <Grid container className={styles.applicationContainer} spacing={2}>
              {acceptedData.map((element) => {
                const key = element.id;
                return (
                  <GridCard item xs={12} key={key}>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 날짜</Typography>
                      <Typography>
                        {element !== null && `${element.enterDate}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">입장 시간</Typography>
                      <Typography>
                        {element !== null && `${element.enterTime}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">퇴장 시간</Typography>
                      <Typography>
                        {element !== null && `${element.exitTime}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 장소</Typography>
                      <Typography>
                        {element !== null &&
                          element.loc !== null &&
                          `${element.loc.label} 클러스터`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 대상</Typography>
                      <Typography>
                        {element !== null &&
                          element.staff !== null &&
                          `${element.staff.label} ${staffSuffix[element.staff.role]
                          }`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문자 이름</Typography>
                      <Typography>
                        {element !== null && `${element.userName}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문자 번호</Typography>
                      <Typography>
                        {element !== null && `${element.userPhone}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBox}>
                      <Typography variant="h5">방문 목적</Typography>
                      <Typography>
                        {element !== null && `${element.purpose}`}
                      </Typography>
                    </Box>
                    <Box className={styles.applicationBtns}>
                      <Button color="primary" variant="contained">
                        <Typography
                          variant="h5"
                          onClick={() => handleFinish(key)}
                        >
                          완료
                        </Typography>
                      </Button>
                    </Box>
                  </GridCard>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Staff;
