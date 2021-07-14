import { Box, Grid, makeStyles, Checkbox, Button } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  privacyPolicyContainer: {
    paddingTop: "10px",
  },
  gridContainer: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  gridTitle: {
    fontSize: "1.2rem",
  },
  gridItem: {},
  title: {
    fontSize: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: "0.7rem",
  },
  contentFooter: {
    fontSize: "0.7rem",
  },
  acceptBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.3rem",
    paddingTop: "10px",
  },
  btns: {
    backgroundColor: "rgba( 255, 255, 255, 0 )",
  },
});

const PrivacyPolicy = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className={classes.privacyPolicyContainer}>
      <Box className={classes.title}>
        개인정보 수집, 이용 동의
        <Button
          variant="contained"
          color="default"
          onClick={handleIsOpen}
          className={classes.btns}
        >
          약관 보기
        </Button>
      </Box>
      <Box hidden={isOpen}>
        <Box className={classes.subTitle}>
          42Visitor는 방문 신청, 방문 조회, QR 코드 전달 등을 위해 아래와 같은
          개인정보를 수집, 이용합니다.
        </Box>
        <Box className={classes.content}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={4} className={classes.gridTitle}>
              수집 목적
            </Grid>
            <Grid item xs={4} className={classes.gridTitle}>
              수집 항목
            </Grid>
            <Grid item xs={4} className={classes.gridTitle}>
              수집 근거
            </Grid>
            <Grid item xs={4}>
              방문 신청 및 방문 조회 서비스 제공
            </Grid>
            <Grid item xs={4}>
              방문자 소속, 방문자 이름, 방문자 전화번호
            </Grid>
            <Grid item xs={4}>
              개인 정보 보호법 제15조 제1항
            </Grid>
          </Grid>
          <Box className={classes.contentFooter}>
            귀하는 개인정보 수집, 이용에 동의하지 않을 권리가 있으며, 동의를
            거부할 경우에는 거부한 내용 관련 서비스를 받을 수 없습니다.
          </Box>
        </Box>
      </Box>
      <Box className={classes.acceptBox}>
        <Box>개인정보 수집,이용에 동의합니다.(필수)</Box>
        <Box>
          동의함
          <Checkbox
            checked={props.accept}
            onChange={props.handleAcceptedChange}
            color="default"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
