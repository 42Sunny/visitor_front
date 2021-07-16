import React, { useState } from "react";

import {
  Typography,
  TextField,
  Grid,
  Container,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
  Box,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "styles/Application.module.css";
import ko from "date-fns/locale/ko";
import { locItems } from "data/location";
import QR from "components/QR";
import PrivacyPolicy from "components/PrivacyPolicy";
import { useHistory } from "react-router-dom";
import axios from "axios";

registerLocale("ko", ko);

const useStyles = makeStyles({
  applicationContainer: {
  },
  appContainer: {
    backgroundColor: "rgba( 255, 255, 255, 0.7 )",
    borderRadius: "2vh",
    padding: "3vh",
  },
  btns: {
    marginTop: "1vh",
    backgroundColor: "rgba( 255, 255, 255, 0 )",
    width: "5vh",
    height: "5vh",
  },
  btnsBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  plusMinusGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusMinusBtn: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
});

// const url = "http://localhost:8080";
const url = "https://api.visitor.dev.42seoul.io";

const PutContent = ({ elem }) => {
  const newDate = new Date();
  newDate.setFullYear(elem.date[0]);
  newDate.setMonth(elem.date[1] - 1);
  newDate.setDate(elem.date[2]);
  newDate.setHours(elem.date[3]);
  newDate.setMinutes(elem.date[4]);
  const classes = useStyles();
  const [staff, setStaff] = useState(elem.staff.name);
  const [loc, setLoc] = useState({
    id: "서초" === elem.place,
    label: elem.place,
    value: elem.place,
  });
  const [accept, setAccept] = useState(false);
  const [enterDate, setEnterDate] = useState(newDate);
  const [purpose, setPurpose] = useState(elem.purpose);
  const [resultOpen, setResultOpen] = useState(false);
  const [data, setData] = useState(elem);
  const [visitor, setVisitor] = useState([elem.visitor]);

  const history = useHistory();

  const handleStaffName = (event) => setStaff(event.target.value);
  const handlePurpose = (event) => setPurpose(event.target.value);
  const handleLoc = (event) => setLoc(event.target.value);
  const handleEnterDate = (date) => setEnterDate(date);
  const handleClickSubmit = () => {
    if (checkValues(staff, purpose)) submitData();
  };
  const handleResultClose = () => {
    history.push("/check-reservation");
  };
  const handleAcceptedChange = (event) => {
    setAccept(event.target.checked);
  };

  const [staffNameError, setStaffNameError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);
  const [locError, setLocError] = useState(false);

  const makeUser = (idx, elem) => {
    return (
      <React.Fragment key={elem.key}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            value={elem.organization}
            onChange={(event) => {
              const newVistor = visitor.slice();
              newVistor[idx].organization = event.target.value;
              setVisitor(newVistor);
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            value={elem.name}
            onChange={(event) => {
              const newVistor = visitor.slice();
              newVistor[idx].name = event.target.value;
              setVisitor(newVistor);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            value={elem.phone}
            onChange={(event) => {
              const newVistor = visitor.slice();
              newVistor[idx].phone = event.target.value;
              setVisitor(newVistor);
            }}
          />
        </Grid>
        <Grid item xs={2} className={classes.plusMinusGrid}>
          <Button
            className={classes.plusMinusBtn}
            variant="contained"
            onClick={() => {
              const number = visitor.filter(
                (target) => elem.key !== target.key
              );
              setVisitor(number);
            }}
          >
            삭제
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const checkValues = (staff, purpose) => {
    const result = staff === null || purpose === "" || loc === "";
    setStaffNameError(staff === "");
    setPurposeError(purpose === "");
    setLocError(loc === "");
    return !result;
  };

  const submitData = () => {
    submitDataToServer();
  };

  const submitDataToServer = async () => {
    const hour = enterDate.getHours().toString();
    const minutes = enterDate.getMinutes().toString();
    const month = (enterDate.getMonth() + 1).toString();
    const monthOfDate = enterDate.getDate().toString();
    const data = {
      date: `${enterDate.getFullYear()}-${
        month.length === 1 ? `0${month}` : month
      }-${monthOfDate.length === 1 ? `0${monthOfDate}` : monthOfDate} ${
        hour.length === 1 ? `0${hour}` : hour
      }:${minutes.length === 1 ? `0${minutes}` : minutes}`,
      place: JSON.parse(loc).label,
      purpose,
      targetStaffName: staff,
      reserveId: elem.visitor.reserveId,
      visitor,
    };
    const result = await axios(
      {
        method: "put",
        url: `${url}/reserve`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    history.push("/");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.push("/check-reservation");
  };

  return (
    <Box className={classes.applicationContainer}>
      <Container maxWidth="sm" className={classes.appContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">방문 신청</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">방문 장소</Typography>
            <FormControl component="fieldset" error={locError}>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                value={loc}
                onChange={handleLoc}
              >
                {locItems.map((item) => (
                  <FormControlLabel
                    key={`${item.id}`}
                    value={JSON.stringify(item)}
                    control={<Radio color="primary" />}
                    label={`${item.label}`}
                    selected={loc.label === item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">방문 날짜 및 시간</Typography>
            <DatePicker
              selected={enterDate}
              onChange={handleEnterDate}
              showTimeSelect
              dateFormat="Pp"
              locale="ko"
              className={styles.dateInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">방문 대상</Typography>
            <TextField
              fullWidth
              value={staff}
              onChange={handleStaffName}
              error={staffNameError}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="h6">신청자 소속</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6">신청자 이름</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">신청자 번호</Typography>
          </Grid>
          <Grid item xs={2} className={classes.plusMinusGrid}>
            <Button
              className={classes.plusMinusBtn}
              variant="contained"
              onClick={() => {
                const newVisitor = visitor.slice();
                const newData = {
                  name: "",
                  organization: "",
                  phone: "",
                  reserve_id: visitor.length,
                  key: `${new Date().toLocaleTimeString()}-${new Date().getMilliseconds()}`,
                };
                newVisitor.push(newData);
                setVisitor(newVisitor);
              }}
            >
              추가
            </Button>
          </Grid>

          {visitor.map((elem, idx) => {
            return makeUser(idx, elem);
          })}

          <Grid item xs={12}>
            <Typography variant="h6">방문 목적</Typography>
            <TextField
              fullWidth
              multiline
              value={purpose}
              onChange={handlePurpose}
              error={purposeError}
            />
          </Grid>
          <Grid item xs={12}>
            <PrivacyPolicy
              accept={accept}
              handleAcceptedChange={handleAcceptedChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.btnsBox}>
              <Button
                variant="contained"
                onClick={handleCancel}
                className={classes.btns}
              >
                <Typography variant="subtitle1">종료</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={handleClickSubmit}
                className={classes.btns}
                disabled={!accept}
              >
                <Typography variant="subtitle1">신청</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={resultOpen} onClose={handleResultClose}>
        <DialogContent>
          <QR code={data} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PutContent;
