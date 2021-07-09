import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import styles from "styles/Admin.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { staffSuffix } from "data/staff";
import ApplicationForAdmin from "components/ApplicationForAdmin";
import { getStateAvatar } from "tools/getStateAvatar";

const getStaffName = ({ value }) => {
  return `${value.label} ${staffSuffix[value.role]}`;
}

const useData = (admin, createOpen, updateOpen) => {
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
  }, [admin, createOpen, updateOpen]);

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

const Admin = ({ location }) => {
  const admin = useState(
    decrypt(location.search.slice(7), process.env.REACT_APP_AES_KEY)
  )[0];
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const { data, waitData, acceptData, rejectData, finishData, progressData } =
    useData(admin, createOpen, updateOpen);

  const handleCreateClose = () => {
    setCreateOpen(false);
  };

  const handleCreateOpen = () => {
    setCreateOpen(true);
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 200,
    },
    {
      field: 'state',
      headerName: '상태',
      width: 120,
      renderCell: (params) => (
        getStateAvatar(params.value)
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

  return (
    <>
      <Container maxWidth="xl">
        <Box className={styles.title}>
          <Typography variant="h2">{`${admin.label} 관리자`}</Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={handleCreateOpen}>
              <Typography variant="h6" onClick={handleCreateOpen}>방문 신청</Typography>
            </Button>
            <Link to={`/`} className={`link`}>
              <Button color="secondary" variant="contained">
                <Typography variant="h6">로그아웃</Typography>
              </Button>
            </Link>
          </Box>
        </Box>

        <Box className={styles.dataBoxMain}>
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

      <ApplicationForAdmin open={createOpen} onClose={handleCreateClose} />
    </>
  );
};

export default Admin;
