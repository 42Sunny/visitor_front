import React, { useState } from "react";
import { TextField, Typography, Box, Grid, Button } from "@material-ui/core";
import { useStyles } from "styles/CheckReservationStyle";
import { Dialog } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import PutContent from "components/PutContent";
import { getReserves } from "tools/apiHandler";
import { deleteReserve } from "tools/apiHandler";

const CheckReservation = ({ history }) => {
  const styles = useStyles();

  const [data, setData] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [resultIdx, setResultIdx] = useState(-1);
  const [resultOpen, setResultOpen] = useState(false);
  const [selectedElem, setElem] = useState(null);
  const [userNameError, setUserNameError] = useState(false);
  const [userPhoneError, setUserPhoneError] = useState(false);

  const checkError = () => {
    const result = userName === "" || userPhone === "";
    setUserNameError(userName === "");
    setUserPhoneError(userPhone === "");
    return !result;
  };

  const handleCheck = async () => {
    if (checkError()) {
      let result;
      try {
        result = await getReserves(userName, userPhone);
      } catch {
        result = { data: [] };
      } finally {
        setData(result.data);
      }
    }
  };

  const handleResultClose = () => {
    setResultOpen(false);
  };

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleUserPhone = (event) => {
    setUserPhone(event.target.value);
  };

  const handleBack = () => {
    history.go(-1);
  };

  const handleClickAvatar = (elem) => {
    const id = elem.id;
    setResultIdx(id);
    setResultOpen(true);
  };

  return (
    <Box className={styles.checkReservationBox}>
      <Box className={styles.rootContainer}>
        <Grid container spacing={1}>
          <Grid item xs={12} className={styles.checkHeader}>
            <Typography variant="h4">방문 예약 조회</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Box className={styles.inputBox}>
              <Typography variant="h6">방문자 이름</Typography>
              <TextField
                error={userNameError}
                onChange={handleUserName}
                value={userName}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box className={styles.inputBox}>
              <Typography variant="h6">방문자 번호</Typography>
              <TextField
                error={userPhoneError}
                onChange={handleUserPhone}
                value={userPhone}
              />
            </Box>
          </Grid>
          <Grid item xs={2} className={styles.checkBtnGrid}>
            <Button
              variant="contained"
              className={styles.checkButton}
              onClick={handleCheck}
            >
              조회
            </Button>
          </Grid>
        </Grid>
        <Box className={styles.checkList}>
          {data === null ? null : data.length === 0 ? (
            <Box>
              <Typography variant="h4">해당하는 예약이 없습니다.</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={1}>
                <Grid item xs={3} className={styles.checkListTitle}>
                  <Typography variant="h6">방문 날짜</Typography>
                </Grid>
                <Grid item xs={2} className={styles.checkListTitle}>
                  <Typography variant="h6">방문 장소</Typography>
                </Grid>
                <Grid item xs={2} className={styles.checkListTitle}>
                  <Typography variant="h6">방문 대상</Typography>
                </Grid>
                <Grid item xs={3} className={styles.checkListTitle}>
                  <Typography variant="h6">방문 목적</Typography>
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>

              {data.map((elem) => (
                <Grid container spacing={1} key={elem.id}>
                  <Grid item xs={3} className={styles.checkElem}>
                    <Typography variant="h6">
                      {`${elem.date[0]}-${elem.date[1]}-${elem.date[2]} ${elem.date[3]}:${elem.date[4]}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className={styles.checkElem}>
                    <Typography variant="h6">{elem.place}</Typography>
                  </Grid>
                  <Grid item xs={2} className={styles.checkElem}>
                    <Typography variant="h6">{elem.staff.name}</Typography>
                  </Grid>
                  <Grid item xs={3} className={styles.checkElem}>
                    <Typography variant="h6">{elem.purpose}</Typography>
                  </Grid>
                  <Grid item xs={2} className={styles.deleteGrid}>
                    <Button
                      variant="contained"
                      className={styles.deleteBtn}
                      onClick={() => {
                        setElem(elem);
                        setResultOpen(true);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="contained"
                      className={styles.deleteBtn}
                      onClick={async () => {
                        const {
                          visitor: { name },
                        } = elem;
                        const {
                          visitor: { phone },
                        } = elem;
                        const {
                          visitor: { reserveId },
                        } = elem;
                        await deleteReserve(name, phone, reserveId);
                        const newData = data.filter(
                          (target) => target.id !== elem.id
                        );
                        setData(newData);
                      }}
                    >
                      삭제
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </>
          )}
        </Box>
        <Box className={styles.prevBtnBox}>
            <Button
              variant="contained"
              onClick={handleBack}
              className={styles.prevButton}
            >
              이전
            </Button>
          </Box>
      </Box>
      <Dialog open={resultOpen} onClose={handleResultClose}>
        <DialogContent>
          <PutContent
            idx={resultIdx}
            onRefresh={handleCheck}
            onClose={handleResultClose}
            elem={selectedElem}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CheckReservation;
