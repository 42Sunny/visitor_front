import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import styles from "styles/Admin.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";

const useData = () => {
  const [data, setData] = useState([]);
  const [waitData, setWaitData] = useState([]);
  const [acceptData, setAcceptData] = useState([]);
  const [rejectData, setRejectData] = useState([]);
  const [finishData, setFinishData] = useState([]);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("reservation"));
    setData(data);
  }, []);

  useEffect(() => {
    if (data !== null) {
      setWaitData(data.filter((d) => d.state === "wait"));
      setAcceptData(data.filter((d) => d.state === "accept"));
      setRejectData(data.filter((d) => d.state === "reject"));
      setFinishData(data.filter((d) => d.state === "finish"));
      setProgressData(data.filter((d) => d.state === "progress"));
    }
  }, [data]);

  return { data, waitData, acceptData, rejectData, finishData, progressData };
};

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Admin = ({ location }) => {
  const admin = useState(
    decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY)
  )[0];
  const { data, waitData, acceptData, rejectData, finishData, progressData } =
    useData();

  return (
    <Container maxWidth="xl">
      <Box className={styles.title}>
        <Typography variant="h2">{`${admin.label} 관리자`}</Typography>
        <Link to={`/`} className={`link`}>
          <Button color="secondary" variant="contained">
            <Typography variant="h6">로그아웃</Typography>
          </Button>
        </Link>
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 신청 승인 대기</Typography>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
      </Box>
    </Container>
  );
};

export default Admin;
