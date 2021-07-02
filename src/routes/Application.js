import React, { useState } from "react";

import {
  Typography,
  TextField,
  MenuItem,
  Grid,
  Container,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { staffs, staffSuffix } from "data/staff";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "styles/Application.module.css";
import ko from "date-fns/locale/ko";
import { locItems } from "data/location";
import ApplicationResult from "./ApplicationResult";

registerLocale("ko", ko);

const Application = ({ history }) => {
  const [staff, setStaff] = useState("");
  const [loc, setLoc] = useState("");
  const [resultIdx, setResultIdx] = useState(-1);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [enterDate, setEnterDate] = useState(new Date());
  const [enterTime, setEnterTime] = useState(new Date());
  const [exitTime, setExitTime] = useState(new Date());
  const [purpose, setPurpose] = useState("");
  const [resultOpen, setResultOpen] = useState(false);

  const handleStaffName = (event) => setStaff(event.target.value);
  const handleUserName = (event) => setUserName(event.target.value);
  const handleUserPhone = (event) => setUserPhone(event.target.value);
  const handlePurpose = (event) => setPurpose(event.target.value);
  const handleLoc = (event) => setLoc(event.target.value);
  const handleEnterDate = (date) => setEnterDate(date);
  const handleEnterTime = (time) => setEnterTime(time);
  const handleExitTime = (time) => setExitTime(time);
  const handleClickSubmit = () => {
    if (checkValues(staff, userName, purpose))
      dataSubmit();
  };
  const handleResultClose = () => {
    history.push("/");
  }

  const [staffNameError, setStaffNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [userPhoneError, setUserPhoneError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [locError, setLocError] = useState(false);

  const checkValues = (staff, userName, purpose) => {
    const result = staff === null || userName === "" || purpose === "" || userPhone === "" || loc === "";
    setStaffNameError(staff === "");
    setUserNameError(userName === "");
    setPurposeError(purpose === "");
    setUserPhoneError(userPhone === "");
    setLocError(loc === "");
    return !result;
  };

  const dataSubmit = () => {
    const length = postData();
    setResultIdx(length - 1);
    setResultOpen(true);
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
      id: prevData.length,
      state: "wait",
      enterDate: enterDate.toLocaleDateString("ko-KR", "P"),
      enterTime: enterTime.toLocaleTimeString("ko-KR", "p"),
      exitTime: exitTime.toLocaleTimeString("ko-KR", "p"),
      loc: JSON.parse(loc),
      staff,
      userName,
      userPhone,
      purpose,
    });
    window.localStorage.setItem("reservation", JSON.stringify(prevData));
    return prevData.length;
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">방문 신청</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">방문 날짜</Typography>
            <DatePicker
              selected={enterDate}
              onChange={handleEnterDate}
              dateFormat="P"
              locale="ko"
              className={styles.dateInput}
            />
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">방문 장소</Typography>
            <FormControl component="fieldset" error={locError}>
              <RadioGroup row aria-label="position" name="position" value={loc} onChange={handleLoc}>
                {locItems.map((item) =>
                  <FormControlLabel key={`${item.id}`} value={JSON.stringify(item)} control={<Radio color="primary" />} label={`${item.label}`}/>
                )}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">방문자 이름</Typography>
            <TextField
              fullWidth
              value={userName}
              onChange={handleUserName}
              error={userNameError}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">방문자 번호</Typography>
            <TextField
              fullWidth
              value={userPhone}
              onChange={handleUserPhone}
              error={userPhoneError}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">방문 목적</Typography>
            <TextField
              fullWidth
              multiline
              value={purpose}
              onChange={handlePurpose}
              error={purposeError}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={handleClickSubmit}
            >
              제출
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleCancel}>
              돌아가기
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={resultOpen} onClose={handleResultClose}>
        <DialogContent>
          <ApplicationResult idx={resultIdx} onClose={handleResultClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Application;
