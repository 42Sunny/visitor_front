import React, { useState } from "react";
import GridCard from "components/GridCard";
import {
  Typography,
  TextField,
  MenuItem,
  Grid,
  Container,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { staffs, staffSuffix } from "data/staff";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "styles/Application.module.css";
import ko from "date-fns/locale/ko";
import { locItems } from "data/location";

registerLocale("ko", ko);

const Application = ({ history }) => {
  const [staff, setStaff] = useState("");
  const [loc, setLoc] = useState("");
  const [userName, setUserName] = useState("");
  const [enterDate, setEnterDate] = useState(new Date());
  const [enterTime, setEnterTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [purpose, setPurpose] = useState("");
  const [submitOpen, setOpen] = useState(false);

  const handleStaffName = (event) => setStaff(event.target.value);
  const handleUserName = (event) => setUserName(event.target.value);
  const handlePurpose = (event) => setPurpose(event.target.value);
  const handleLoc = (event) => setLoc(event.target.value);
  const handleEnterDate = (date) => setEnterDate(date);
  const handleEnterTime = (time) => setEnterTime(time);
  const handleExitTime = (time) => setExitTime(time);
  const handleClickOpen = () => setOpen(checkValues(staff, userName, purpose));
  const handleClose = () => setOpen(false);

  const [staffNameError, setStaffNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);

  const checkValues = (staff, userName, purpose) => {
    const result = staff === null || userName === "" || purpose === "";
    setStaffNameError(staff === "");
    setUserNameError(userName === "");
    setPurposeError(purpose === "");
    return !result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const length = postData();
    history.push(`/application-result/${length - 1}`);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.go(-1);
  };

  const postData = () => {
    let prevData = window.localStorage.getItem("reservation");
    if (prevData === null) prevData = [];
    else prevData = JSON.parse(prevData);
    prevData.push({
      state: "wait",
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
            <Typography variant="h3">방문 신청</Typography>
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
            <Typography variant="h5">방문 대상</Typography>
            <TextField
              select
              fullWidth
              value={staff}
              onChange={handleStaffName}
              error={staffNameError}
            >
              {staffs.map((staff) => {
                const suffix = staffSuffix[staff.role];
                return (
                  <MenuItem key={`${staff.role}-${staff.value}`} value={staff}>
                    {`${staff.label} ${suffix}`}
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
          {"아래 내용으로 신청하시겠습니까?"}
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
            {`방문 대상  : ${staff !== null && `${staff.label} ${staffSuffix[staff.role]}`
              }`}
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

export default Application;
