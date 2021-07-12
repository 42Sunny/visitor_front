import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  makeStyles,
  Box,
} from "@material-ui/core";
import { staffs } from "data/staff";
import { encrypt } from "tools/dataHandler";

const useStyles = makeStyles({
  loginContainer: {
    height: "100vh",
    paddingTop: "30vh",
  },
  loginBox: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "3vh",
    borderRadius: "2vh",
  },
  loginBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  },
});

const Login = ({ history }) => {
  const classes = useStyles();
  const [staff, setStaff] = useState("");
  const [staffError, setStaffError] = useState(false);
  const handleStaffName = (event) => setStaff(event.target.value);

  const handleLogin = (event) => {
    event.preventDefault();
    if (staff === "") setStaffError(true);
    else if (staff.admin === 0)
      history.push(
        `/staff?staff=${encrypt(staff, process.env.REACT_APP_AES_KEY)}`
      );
    else
      history.push(
        `/admin?admin=${encrypt(staff, process.env.REACT_APP_AES_KEY)}`
      );
  };

  return (
    <Box className={classes.loginContainer}>
      <Container maxWidth="sm" className={classes.loginBox}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3">로그인</Typography>
            <TextField
              select
              fullWidth
              value={staff}
              onChange={(event) => {
                handleStaffName(event);
                setStaffError(false);
              }}
              error={staffError}
            >
              {staffs.map((staff) => {
                return (
                  <MenuItem key={`${staff.role}-${staff.value}`} value={staff}>
                    {`${staff.label}`}
                  </MenuItem>
                );
              })}
            </TextField>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.loginBtn}
                onClick={handleLogin}
              >
                로그인
              </Button>
              <Button
                variant="contained"
                className={classes.loginBtn}
                onClick={() => {
                  history.go(-1);
                }}
              >
                돌아가기
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
