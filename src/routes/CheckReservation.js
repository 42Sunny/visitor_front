import React, { useState } from 'react';
import { TextField, Container, Typography, Box, Grid, Button } from '@material-ui/core';
import { useStyles } from 'styles/CheckReservationStyle';
import { staffSuffix } from 'data/staff';
import { getStateAvatar } from 'tools/getStateAvatar';
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import ApplicationResult from 'components/ApplicationResult';
import axios from 'axios';

/*
{
  "result": "Boolean",
  "contents" :
  [
    {
      "id": "Long",
      "place": "String",
      "targetStaff": "Long",
      "visitorOrganization": "String",
      "visitorName": "String",
      "visitorPhone": "String",
      "purpose": "String", 
      "date": "Datetime"
    },
    {
      ...
    }
  ]
}
*/

const CheckReservation = ({ history }) => {
  const styles = useStyles();
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [resultIdx, setResultIdx] = useState(-1);
  const [resultOpen, setResultOpen] = useState(false);

  const [userNameError, setUserNameError] = useState(false);
  const [userPhoneError, setUserPhoneError] = useState(false);
  
  const checkError = () => {
    const result = userName === "" || userPhone === "";
    setUserNameError(userName === "");
    setUserPhoneError(userPhone === "");
    return !result;
  }
  
  const handleCheck = async () => {
    if (checkError()) {
      // const data = JSON.parse(window.localStorage.getItem("reservation"));
      const data = await axios({
        method: "post",
        url: "http://localhost:8080/reserves",
        data: {
          name: userName,
          phone: userPhone,
        }
      })
      console.log(data);
      if (data !== null) {
        const checked = data.filter((elem) => elem.userName === userName && elem.userPhone === userPhone);
        setData(checked);
      }
    }
  }
  
  const handleResultClose = () => {
    setResultOpen(false);
  }

  const handleUserName = (event) => {
    setUserName(event.target.value);
  }

  const handleUserPhone = (event) => {
    setUserPhone(event.target.value);
  }

  const handleBack = () => {
    history.go(-1);
  }

  const handleClickAvatar = (elem) => {
    const id = elem.id;
    setResultIdx(id);
    setResultOpen(true);
  }

  return (
    <>
      <Container maxWidth="md" className={styles.rootContainer}>
        <Grid container spacing={1}>
          <Grid item xs={10} className={styles.checkHeader}>
            <Typography variant="h2">방문 예약 조회</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleBack} className={styles.checkButton}>
              <Typography variant="h5">홈 화면</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box className={styles.inputBox}>
              <Typography variant="h4">방문자 이름</Typography>
              <TextField error={userNameError} onChange={handleUserName} value={userName} />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box className={styles.inputBox}>
              <Typography variant="h4">방문자 번호</Typography>
              <TextField error={userPhoneError} onChange={handleUserPhone} value={userPhone} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" className={styles.checkButton} onClick={handleCheck}>
              <Typography variant="h5">조회</Typography>
            </Button>
          </Grid>
        </Grid>
        <Box className={styles.checkList}>
          {data === null ? null :
            (data.length === 0 ?
              <Box>
                <Typography variant="h2">해당하는 예약이 없습니다.</Typography>
              </Box> :
              <>
                <Box className={styles.checkListComment}>상태를 클릭하여 상세 페이지로 이동할 수 있습니다.</Box>
                <Grid container spacing={1}>
                  <Grid item xs={3} className={styles.checkListTitle}><Typography variant="h5">방문 날짜</Typography></Grid>
                  <Grid item xs={3} className={styles.checkListTitle}><Typography variant="h5">방문 장소</Typography></Grid>
                  <Grid item xs={3} className={styles.checkListTitle}><Typography variant="h5">방문 대상</Typography></Grid>
                  <Grid item xs={3} className={styles.checkListTitle}><Typography variant="h5">방문 목적</Typography></Grid>
                </Grid>

                {data.map((elem) => (
                  <Grid container spacing={1} key={elem.id}>
                    <Grid item xs={3} className={styles.checkElem}><Typography variant="h6">{elem.date}</Typography></Grid>
                    <Grid item xs={3} className={styles.checkElem}><Typography variant="h6">{elem.place}</Typography></Grid>
                    <Grid item xs={3} className={styles.checkElem}><Typography variant="h6">{elem.targetStaff}</Typography></Grid>
                    <Grid item xs={3} className={styles.checkElem}><Typography variant="h6">{elem.purpose}</Typography></Grid>
                  </Grid>
                ))}
              </>
            )
          }
        </Box>
      </Container>
      <Dialog open={resultOpen} onClose={handleResultClose}>
        <DialogContent>
          <ApplicationResult idx={resultIdx} onRefresh={handleCheck} onClose={handleResultClose}/>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CheckReservation;
