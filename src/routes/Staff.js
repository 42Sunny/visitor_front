import React from 'react';
import { Typography, Grid, Button, Box, Container } from '@material-ui/core';
import GridCard from 'components/GridCard';
import { staffSuffix } from 'data/staff';
import styles from 'styles/Staff.module.css';
import { decrypt } from 'tools/dataHandler';
import { Link } from 'react-router-dom';

const Staff = ({ location }) => {
  const staff = decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY);

  return <>
    <Container maxWidth="sm">
      <Typography variant="h2">{staff.label} 멘토님</Typography>
      <Link to={`/Reservation${location.search}`} className={`link`}>
        <Button color="primary" variant="contained">예약 신청</Button>
      </Link>
    </Container>
  </>;
}

export default Staff;