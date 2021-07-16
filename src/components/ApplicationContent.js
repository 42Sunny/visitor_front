import React, { useEffect, useState } from "react";

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
import QR from "components/QR";
import PrivacyPolicy from "components/PrivacyPolicy";
import { useHistory } from "react-router-dom";
import { createReserve } from "tools/apiHandler";

registerLocale("ko", ko);

const useStyles = makeStyles({
  applicationContainer: {
    paddingTop: "10vh",
    paddingBottom: "10vh",
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

const ApplicationContent = () => {
  const classes = useStyles();
  const [staff, setStaff] = useState("");
  const [loc, setLoc] = useState("서초");
  const [accept, setAccept] = useState(false);
  const [enterDate, setEnterDate] = useState(new Date());
  const [purpose, setPurpose] = useState("");
  const [resultOpen, setResultOpen] = useState(false);
  const [data, setData] = useState(null);
  const [visitor, setVisitor] = useState([
    {
      name: "",
      phone: "",
      organization: "",
      key: `${new Date().toLocaleTimeString()}-${new Date().getMilliseconds()}`,
    },
  ]);

  const history = useHistory();

  const handleStaffName = (event) => setStaff(event.target.value);
  const handlePurpose = (event) => setPurpose(event.target.value);
  const handleLoc = (event) => setLoc(event.target.value);
  const handleEnterDate = (date) => setEnterDate(date);
  const handleClickSubmit = () => {
    if (checkValues(staff, purpose)) submitData();
  };
  const handleResultClose = () => {
    history.push("/");
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
              const data = visitor.filter((target) => elem.key !== target.key);
              if (data.length !== 0) setVisitor(data);
            }}
          >
            삭제
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const checkValues = (staff, purpose) => {
    const result = staff === "" || purpose === "" || loc === "";
    setStaffNameError(staff === "");
    setPurposeError(purpose === "");
    setLocError(loc === "");
    const checkVisitor = visitor.every(
      (user) =>
        user.name !== "" && user.phone !== "" && user.organization !== ""
    );
    return checkVisitor && !result;
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
      place: loc,
      purpose,
      targetStaffName: staff,
      visitor,
    };
    const result = await createReserve(data);
    history.push("/");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.go(-1);
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
                onChange={(event) => {
                  handleLoc(event);
                }}
              >
                <FormControlLabel
                  value="서초"
                  control={<Radio color="primary" />}
                  label="서초"
                />
                <FormControlLabel
                  value="개포"
                  control={<Radio color="primary" />}
                  label="개포"
                />
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
                <Typography variant="subtitle1">이전</Typography>
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

export default ApplicationContent;
