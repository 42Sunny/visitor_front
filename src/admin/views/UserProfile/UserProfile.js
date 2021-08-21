import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from 'admin/components/Grid/GridItem.js';
import GridContainer from 'admin/components/Grid/GridContainer.js';
import Button from 'admin/components/CustomButtons/Button.js';
import Card from 'admin/components/Card/Card.js';
import CardHeader from 'admin/components/Card/CardHeader.js';
import CardBody from 'admin/components/Card/CardBody.js';
import CardFooter from 'admin/components/Card/CardFooter.js';

import Table from 'admin/components/Table/Table.js';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
    fontWeight: 'bold',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 'bold',
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>방문 예약</h4>
              <p className={classes.cardCategoryWhite}>예약 정보를 전부 기입해주세요.</p>
            </CardHeader>
            <CardBody></CardBody>
            <CardFooter>
              <Button color="info">생성</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>방문 조회</h4>
              <p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={['ID', '이름', '번호', '직원', '날짜 및 시간', '목적']}
                tableData={
                  [
                    // ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                    // ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                    // ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                  ]
                }
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
