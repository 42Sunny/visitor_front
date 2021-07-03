import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { staffSuffix } from "data/staff";
import { Link } from "react-router-dom";
import styles from "styles/ApplicationResult.module.css";
import { encrypt } from "tools/dataHandler";

const useStyles = makeStyles({
  appBackground: {
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
  },
  appContainer: {
    marginTop: "2vh",
  }
})

const ApplicationResult = (props) => {
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const classes = useStyles();

  const QRLink = (props) => {
    if (data === null) return null;
    const code = JSON.stringify(encrypt(data, process.env.REACT_APP_AES_KEY));
    return props.active === true ? (
      <Grid item xs={2}>
        <Button variant="contained" color="primary">
          <Link
            className={`${styles.link} link`}
            to={`/qr?code=${code.slice(1, code.length - 1)}`}
          >
            <Typography variant="h4">QR</Typography>
          </Link>
        </Button>
      </Grid>
    ) : null;
  };

  const init = () => {
    if (props.idx === -1) return;
    const data = getData(props.idx);
    setData(data);
    setIsActive(data.state === "accept");
  };

  useEffect(() => {
    init();
  }, []);

  const getData = (idx) => {
    const data = JSON.parse(window.localStorage.getItem("reservation"))[idx];
    return data;
  };

  const handleCancel = () => {
    const data = JSON.parse(window.localStorage.getItem("reservation"));
    data[props.idx].state = "cancel";
    window.localStorage.setItem("reservation", JSON.stringify(data));
    if (props.onRefresh !== undefined) props.onRefresh();
    if (props.onClose !== undefined) props.onClose();
    setData(data[props.idx]);
  };

  return (
    <div className={classes.appBackground}>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h3">방문 신청 정보</Typography>
              </Grid>
              <QRLink active={isActive} />
            </Grid>
            <Typography varinat="h6">
              QR코드가 SMS를 통해 전송됩니다.
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">방문 날짜</Typography>
            <Typography>{data !== null && `${data.enterDate}`}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">입장 시간</Typography>
            <Typography>{data !== null && `${data.enterTime}`}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">퇴장 시간</Typography>
            <Typography>{data !== null && `${data.exitTime}`}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">방문 장소</Typography>
            <Typography>
              {data !== null && `${data.loc.label} 클러스터`}
            </Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h5">방문 대상</Typography>
            <Typography>
              {data !== null &&
                data.staff !== null &&
                `${data.staff.label}`}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">방문자 이름</Typography>
            <Typography>{data !== null && `${data.userName}`}</Typography>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h5">방문자 번호</Typography>
            <Typography>{data !== null && `${data.userPhone}`}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="h5">방문 목적</Typography>
            <Typography>{data !== null && `${data.purpose}`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => {
              props.onClose();
            }} variant="contained">돌아가기</Button>
          </Grid>
          {/* <Grid item xs={12}>
          {data === null ? null : data.state === "wait" ||
            data.state === "accept" ? (
            <Button variant="contained" color="primary" onClick={handleCancel}>
              예약 취소
            </Button>
          ) : null}
        </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};

export default ApplicationResult;
