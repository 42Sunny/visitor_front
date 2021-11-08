import React from 'react';
import ReserveBigTitle from '../ReserveBigTitle';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';

const VISITOR_TITLE = '방문자 정보';

const VisitorHeader = ({ numberOfVisitor }) => {
  return (
    <div className={classes.Header}>
      <ReserveBigTitle title={VISITOR_TITLE} />
      <div>{`총 ${numberOfVisitor}명`}</div>
    </div>
  );
};

export default React.memo(VisitorHeader);
