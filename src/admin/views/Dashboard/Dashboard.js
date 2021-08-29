import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import DateRange from '@material-ui/icons/DateRange';
import GridItem from 'admin/components/Grid/GridItem.js';
import GridContainer from 'admin/components/Grid/GridContainer.js';
import Table from 'admin/components/Table/Table.js';
import Card from 'admin/components/Card/Card.js';
import CardHeader from 'admin/components/Card/CardHeader.js';
import CardIcon from 'admin/components/Card/CardIcon.js';
import CardBody from 'admin/components/Card/CardBody.js';
import CardFooter from 'admin/components/Card/CardFooter.js';

import styles from 'admin/assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { getAllReserves } from 'admin/api/apiHandler';
import moment from 'moment';

const useStyles = makeStyles(styles);

/*
1. 대시보드에 오늘 상세 조회 내역 띄우기
  1. 서버에서 데이터 받아오기
  2. 데이터 가공하기
  3. 데이터 출력하기
  -> 비동기는 데이터 관리를 어떻게 해야하는걸까...

2. 대시보드에 현재 들어온 인원 띄우기
3. 대시보드에 오늘 대기중인 인원 띄우기

4. 방문 관리에 날짜별로 확인할 수 있게 만들기
5. 방문 관리에서 인원별로 파악할 수 있게 만들기
*/

const getFomattedNow = () => {
  return moment().format('YYYY-MM-DD');
};

const makeTableData = (rawData) => {
  const result = [];
  rawData.forEach((elem) => {
    const { place, staffName, date, purpose, visitors } = elem;
    visitors.forEach((elem) => {
      const temp = [
        elem.visitorId,
        place,
        date,
        staffName,
        elem.organization,
        elem.name,
        elem.phone,
        purpose,
        elem.status,
      ];
      result.push(temp);
    });
  });
  return result;
};

const countVisitor = (rawData) => {
  let checkin = 0;
  let total = 0;
  rawData.forEach((elem) => {
    const { visitors } = elem;
    visitors.forEach((elem) => {
      if (elem.status === '입실') checkin++;
      total++;
    });
  });
  return [total, checkin];
};

export default function Dashboard() {
  const classes = useStyles();
  const [rawData, setRawData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [checkIn, setCheckIn] = useState(0);
  const [totalVisitor, setTotalVisitor] = useState(0);
  const now = new moment().format('YYYY. MM. DD');

  useEffect(() => {
    getAllReserves(getFomattedNow()).then((res) => setRawData(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableData(makeTableData(rawData));
    const [total, checkin] = countVisitor(rawData);
    setTotalVisitor(total);
    setCheckIn(checkin);
  }, [rawData]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>person_add</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>총 예약자 수</p>
              <h3 className={classes.cardTitle}>{totalVisitor}명</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {now}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>login</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>현재 방문자 수</p>
              <h3 className={classes.cardTitle}>{checkIn}명</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                {now}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>방문 현황</h4>
              <p className={classes.cardCategoryWhite}>{now}</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={[
                  'ID',
                  '장소',
                  '날짜 및 시간',
                  '직원',
                  '소속',
                  '이름',
                  '번호',
                  '목적',
                  '상태',
                ]}
                tableData={tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
//
