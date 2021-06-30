import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button, Avatar } from "@material-ui/core";
import styles from "styles/Admin.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { staffSuffix } from "data/staff";

const getStaffName = ({ value }) => {
  return `${value.label} ${staffSuffix[value.role]}`;
}

const getAvatar = ({ value }) => {
  if (value === "wait")
    return <Avatar className={styles.waitAvatar}>대기</Avatar>;
  if (value === "reject")
    return <Avatar className={styles.rejectAvatar}>거절</Avatar>;
  if (value === "progress")
    return <Avatar className={styles.progressAvatar}>진행</Avatar>;
  if (value === "accept")
    return <Avatar className={styles.acceptAvatar}>수락</Avatar>;
  if (value === "finish")
    return <Avatar className={styles.finishAvatar}>종료</Avatar>;
  return null;
}

const useData = (admin) => {
  const [raw, setRaw] = useState([]);
  const [data, setData] = useState([]);
  const [waitData, setWaitData] = useState([]);
  const [acceptData, setAcceptData] = useState([]);
  const [rejectData, setRejectData] = useState([]);
  const [finishData, setFinishData] = useState([]);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("reservation"));
    setRaw(data);
    if (data !== null) {
      const selectedData = data.filter((elem) => (elem.loc.label === (admin !== null && admin.label)))
      setData(selectedData);
    }
  }, [admin]);

  useEffect(() => {
    if (data !== []) {
      setWaitData(data.filter((d) => d.state === "wait"));
      setAcceptData(data.filter((d) => d.state === "accept"));
      setRejectData(data.filter((d) => d.state === "reject"));
      setFinishData(data.filter((d) => d.state === "finish"));
      setProgressData(data.filter((d) => d.state === "progress"));
    }
  }, [data]);

  return { raw, data, waitData, acceptData, rejectData, finishData, progressData };
};

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'state',
    headerName: '상태',
    width: 120,
    renderCell: (params) => (
      getAvatar(params)
    ),
  },
  {
    field: 'enterDate',
    headerName: '방문 날짜',
    width: 150,
  },
  {
    field: 'enterTime',
    headerName: '입장 시간',
    width: 150,
  },
  {
    field: 'exitTime',
    headerName: '퇴장 시간',
    width: 150,
  },
  {
    field: 'staff',
    headerName: '방문 대상',
    width: 150,
    valueGetter: getStaffName,
  },
  {
    field: 'userName',
    headerName: '방문자 이름',
    width: 150,
  },
  {
    field: 'userPhone',
    headerName: '방문자 번호',
    width: 150,
  },
  {
    field: 'purpose',
    headerName: '방문 목적',
    width: 150,
  },
];

const Admin = ({ location }) => {
  const admin = useState(
    decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY)
  )[0];
  const { data, waitData, acceptData, rejectData, finishData, progressData } =
    useData(admin);

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
        <Typography variant="h4">방문 현황</Typography>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 신청 대기</Typography>
        <DataGrid
          rows={waitData}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 신청 수락</Typography>
        <DataGrid
          rows={acceptData}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 신청 거절</Typography>
        <DataGrid
          rows={rejectData}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 신청 수락</Typography>
        <DataGrid
          rows={acceptData}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 진행</Typography>
        <DataGrid
          rows={progressData}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <Box className={styles.dataBox}>
        <Typography variant="h4">방문 완료</Typography>
        <DataGrid
          rows={finishData}
          columns={columns}
          pageSize={100}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default Admin;
