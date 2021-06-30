import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, MenuItem } from '@material-ui/core';
import { staffs, staffSuffix } from 'data/staff';
import { Link } from 'react-router-dom';
import { encrypt } from 'tools/dataHandler';
import GridCard from 'components/GridCard';

const Login = ({ history }) => {
  const [staff, setStaff] = useState("");
  const [staffError, setStaffError] = useState(false);
  const handleStaffName = (event) => setStaff(event.target.value);

  const handleLogin = (event) => {
    event.preventDefault();
    if (staff === "")
      setStaffError(true);
    else
      if (staff.admin === 0)
        history.push(`/staff?staff=${encrypt(staff, process.env.REACT_APP_AES_KEY)}`);
      else
        history.push(`/admin?admin=${encrypt(staff, process.env.REACT_APP_AES_KEY)}`);
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <GridCard item xs={12}>
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
              const suffix = staffSuffix[staff.role];
              return (
                <MenuItem key={`${staff.role}-${staff.value}`} value={staff}>
                  {`${staff.label} ${suffix}`}
                </MenuItem>
              );
            })}
          </TextField>
        </GridCard>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleLogin}>로그인</Button>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Login;