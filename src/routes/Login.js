import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, MenuItem } from '@material-ui/core';
import { staffs, staffSuffix } from '../data/staff';
import { Link } from 'react-router-dom';
import { encrypt } from '../tools/dataHandler';
import GridCard from '../components/GridCard';

const Login = () => {
  const [staff, setStaff] = useState("");
  const handleStaffName = (event) => setStaff(event.target.value);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={1}>
        <GridCard item xs={12}>
          <Typography variant="h3">로그인</Typography>
          <TextField
            select
            fullWidth
            value={staff}
            onChange={handleStaffName}
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
          <Link to={`/reservation?staff=${encrypt(staff, process.env.REACT_APP_AES_KEY)}`} className={`link`}>
            <Button variant="contained" color="primary">로그인</Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Login;