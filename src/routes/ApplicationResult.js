import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import GridCard from "components/GridCard";
import { staffSuffix } from "data/staff";
import { Link } from "react-router-dom";
import styles from "styles/ApplicationResult.module.css";
import { encrypt } from "tools/dataHandler";

const ApplicationResult = ({ match }) => {
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const QRLink = (props) => {
    if (data === null)
      return null;
    const code = encrypt(data, process.env.REACT_APP_AES_KEY);
    return (
      props.active === true ? (
        <Grid item xs={2}>
          <Button variant="contained" color="primary">
            <Link className={`${styles.link} link`} to={`/qr?code=${code}`}>
              <Typography variant="h4">QR</Typography>
            </Link>
          </Button>
        </Grid>
      ) : null
    );
  };

  const init = () => {
    const data = getData(match.params.number);
    setData(data);
    setInterval(() => {
      setIsActive(true);
    }, 500);
  }

  useEffect(() => {
    init();
  }, []);

  const getData = (idx) => {
    const data = JSON.parse(window.localStorage.getItem("reservation"))[idx];
    return data;
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <GridCard item xs={12}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h3">방문 신청 정보</Typography>
            </Grid>
            <QRLink active={isActive} />
          </Grid>
          <Typography varinat="h6">
            방문 대상이 수락하면 qr코드가 sms를 통해 전송됩니다.
          </Typography>
        </GridCard>

        <GridCard item xs={12}>
          <Typography variant="h5">방문 날짜</Typography>
          <Typography>{data !== null && `${data.enterDate}`}</Typography>
        </GridCard>

        <GridCard item xs={12}>
          <Typography variant="h5">입장 시간</Typography>
          <Typography>{data !== null && `${data.enterTime}`}</Typography>
        </GridCard>

        <GridCard item xs={12}>
          <Typography variant="h5">퇴장 시간</Typography>
          <Typography>{data !== null && `${data.exitTime}`}</Typography>
        </GridCard>

        <GridCard item xs={12}>
          <Typography variant="h5">방문 대상</Typography>
          <Typography>
            {data !== null &&
              data.staff !== null &&
              `${data.staff.label} ${staffSuffix[data.staff.role]}`}
          </Typography>
        </GridCard>

        <GridCard item xs={12}>
          <Typography variant="h5">방문자 이름</Typography>
          <Typography>{data !== null && `${data.userName}`}</Typography>
        </GridCard>

        <GridCard item xs={12}>
          <Typography variant="h5">방문 목적</Typography>
          <Typography>{data !== null && `${data.purpose}`}</Typography>
        </GridCard>
      </Grid>
    </Container>
  );
};

export default ApplicationResult;
