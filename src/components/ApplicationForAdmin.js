import React, { useState } from 'react';
import GridCard from "components/GridCard";
import DatePicker from 'react-datepicker';
import { Dialog, DialogContent, Typography, Button, TextField, MenuItem, Grid } from "@material-ui/core";
import { staffSuffix, staffs } from 'data/staff';
import { locItems } from 'data/location';
import styles from "styles/ApplicationForAdmin.module.css";

const states = [
  {
    label: "대기",
    value: "wait"
  },
  {
    label: "거절",
    value: "reject"
  },
  {
    label: "수락",
    value: "accept"
  },
  {
    label: "완료",
    value: "finish"
  },
  {
    label: "진행",
    value: "progress"
  },
]

const ApplicationForAdmin = (props) => {
  const [staff, setStaff] = useState("");
  const [state, setState] = useState("");
  const [loc, setLoc] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [enterDate, setEnterDate] = useState(new Date());
  const [enterTime, setEnterTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [purpose, setPurpose] = useState("");

  const handleStaffName = (event) => setStaff(event.target.value);
  const handleState = (event) => setState(event.target.value);
  const handleUserName = (event) => setUserName(event.target.value);
  const handleUserPhone = (event) => setUserPhone(event.target.value);
  const handlePurpose = (event) => setPurpose(event.target.value);
  const handleLoc = (event) => setLoc(event.target.value);
  const handleEnterDate = (date) => setEnterDate(date);
  const handleEnterTime = (time) => setEnterTime(time);
  const handleExitTime = (time) => setExitTime(time);
  const handlePost = () => {
    if (checkValues(staff, userName, purpose)) {
      postData();
      props.onClose();
    }
  };

  const postData = () => {
    let prevData = window.localStorage.getItem("reservation");
    if (prevData === null) prevData = [];
    else prevData = JSON.parse(prevData);
    prevData.push({
      id: prevData.length,
      enterDate: enterDate.toLocaleDateString("ko-KR", "P"),
      enterTime: enterTime.toLocaleTimeString("ko-KR", "p"),
      exitTime: exitTime.toLocaleTimeString("ko-KR", "p"),
      state: state.value,
      loc,
      staff,
      userName,
      userPhone,
      purpose,
    });
    window.localStorage.setItem("reservation", JSON.stringify(prevData));
    setStaff("");
    setState("");
    setLoc("");
    setUserName("");
    setUserPhone("");
    setEnterDate(new Date());
    setEnterTime(new Date());
    setExitTime(new Date());
    setPurpose("");
    return prevData.length;
  };

  const [staffNameError, setStaffNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [userPhoneError, setUserPhoneError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [locError, setLocError] = useState(false);
  const [stateError, setStateError] = useState(false);

  const checkValues = (staff, userName, purpose) => {
    const result = staff === null || userName === "" || purpose === "" || userPhone === "" || loc === "" || state === "";
    setStaffNameError(staff === "");
    setUserNameError(userName === "");
    setPurposeError(purpose === "");
    setUserPhoneError(userPhone === "");
    setLocError(loc === "");
    setStateError(state === "");
    return !result;
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogContent>
        <Typography variant="h3">방문 신청</Typography>
        <Grid container spacing={2}>
          <GridCard item xs={12}>
            <Typography variant="h5">상태</Typography>
            <TextField
              select
              fullWidth
              value={state}
              onChange={handleState}
              error={stateError}
            >
              {states.map((state) => {
                return (
                  <MenuItem key={`${state.label}-${state.value}`} value={state}>
                    {`${state.label}`}
                  </MenuItem>
                );
              })}
            </TextField>
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
              error={locError}
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
                if (staff.admin === 0)
                  return (
                    <MenuItem key={`${staff.role}-${staff.value}`} value={staff}>
                      {`${staff.label} ${suffix}`}
                    </MenuItem>
                  );
                else
                  return null;
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
            <Typography variant="h5">방문자 번호</Typography>
            <TextField
              fullWidth
              value={userPhone}
              onChange={handleUserPhone}
              error={userPhoneError}
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
          <Grid item xs={12}>
            <Button onClick={handlePost} color="primary" variant="contained">
              <Typography variant="h6">
                생성
              </Typography>
            </Button>
            <Button onClick={props.onClose} color="primary" variant="contained">
              <Typography variant="h6">
                취소
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ApplicationForAdmin;