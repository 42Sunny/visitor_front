import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Dialog,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@material-ui/core";
import GridCard from "components/GridCard";
import DatePicker from "react-datepicker";
import styles from "styles/Reservation.module.css";
import { decrypt } from "tools/dataHandler";
import { locItems } from "data/location";

const Reservation = ({ history, location }) => {
  const [staff, setStaff] = useState("");
  const [userName, setUserName] = useState("");
  const [enterDate, setEnterDate] = useState(new Date());
  const [enterTime, setEnterTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [purpose, setPurpose] = useState("");
  const [submitOpen, setOpen] = useState(false);
  const [loc, setLoc] = useState("");

  const handleUserName = (event) => setUserName(event.target.value);
  const handlePurpose = (event) => setPurpose(event.target.value);
  const handleLoc = (event) => setLoc(event.target.value);
  const handleEnterDate = (date) => setEnterDate(date);
  const handleEnterTime = (time) => setEnterTime(time);
  const handleExitTime = (time) => setExitTime(time);
  const handleClickOpen = () => setOpen(checkValues(userName, purpose));
  const handleClose = () => setOpen(false);

  const [userNameError, setUserNameError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);

  const checkValues = (userName, purpose) => {
    const result = userName === "" || purpose === "";
    setUserNameError(userName === "");
    setPurposeError(purpose === "");
    return !result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const length = postData();
    history.push(`/reservation-result/${length - 1}`);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.go(-1);
  };

  useEffect(() => {
    let data = null;
    if (location !== null) {
      data = location.search.slice(7);
      data = decrypt(data, process.env.REACT_APP_AES_KEY);
    }
    setStaff(data);
  }, [location]);

  const postData = () => {
    let prevData = window.localStorage.getItem("reservation");
    if (prevData === null) prevData = [];
    else prevData = JSON.parse(prevData);
    prevData.push({
      state: "accept",
      enterDate: enterDate.toLocaleDateString(),
      enterTime: enterTime.toLocaleTimeString(),
      exitTime: exitTime.toLocaleTimeString(),
      loc,
      staff,
      userName,
      purpose,
    });
    window.localStorage.setItem("reservation", JSON.stringify(prevData));
    return prevData.length;
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <GridCard item xs={12}>
            <Typography variant="h3">방문 예약</Typography>
            <br />
            <Typography variant="h6">개포 클러스터</Typography>
            <Typography>서울 강남구 개포로 416</Typography>
            <Typography variant="h6">서초 클러스터</Typography>
            <Typography>서울 서초구 강남대로 327 대륭서초타워 4층</Typography>
          </GridCard>

          <GridCard item xs={12}>
            <Typography variant="h5">방문 날짜</Typography>
            <DatePicker
              selected={enterDate}
              onChange={handleEnterDate}
              dateFormat="P"
              locale="ko"
              className={styles.dateInput}
            />
          </GridCard>

          <GridCard item xs={12}>
            <Typography variant="h5">입장 시간</Typography>
            <DatePicker
              selected={enterTime}
              onChange={handleEnterTime}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="p"
              locale="ko"
              className={styles.dateInput}
            />
          </GridCard>

          <GridCard item xs={12}>
            <Typography variant="h5">퇴장 시간</Typography>
            <DatePicker
              selected={exitTime}
              onChange={handleExitTime}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="p"
              locale="ko"
              className={styles.dateInput}
            />
          </GridCard>

          <GridCard item xs={12}>
            <Typography variant="h5">방문 장소</Typography>
            <TextField
              select
              fullWidth
              value={loc}
              onChange={handleLoc}
            >
              {locItems.map((item) => {
                return (
                  <MenuItem key={`${item.label}-${item.value}`} value={item}>
                    {`${item.label} 클러스터`}
                  </MenuItem>
                );
              })}
            </TextField>
          </GridCard>

          <GridCard item xs={12}>
            <Typography variant="h5">방문자 이름</Typography>
            <TextField
              fullWidth
              value={userName}
              onChange={handleUserName}
              error={userNameError}
            />
          </GridCard>

          <GridCard item xs={12}>
            <Typography variant="h5">방문 목적</Typography>
            <TextField
              fullWidth
              multiline
              value={purpose}
              onChange={handlePurpose}
              error={purposeError}
            />
          </GridCard>

          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              <Typography variant="h5">제출</Typography>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={handleCancel}>
              <Typography variant="h5">돌아가기</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={submitOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"아래 내용으로 예약하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`방문 날짜  : ${enterDate.toLocaleDateString("ko-KR", "P")}`}
            <br />
            {`입장 시간  : ${enterTime.toLocaleTimeString("ko-KR", "p")}`}
            <br />
            {`퇴장 시간  : ${exitTime.toLocaleTimeString("ko-KR", "p")}`}
            <br />
            {`방문 장소  : ${loc !== null && `${loc.label} 클러스터`}`}
            <br />
            {`방문자 이름 : ${userName}`}
            <br />
            {`방문 목적  : ${purpose}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            신청
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reservation;
