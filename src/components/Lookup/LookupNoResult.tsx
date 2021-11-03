import React from 'react';
import classes from 'assets/styles/LookupPage.module.css';
import icon_no_result from 'assets/images/icon_no_result.svg';

const LookupNoResult = () => {
  return (
    <div className={classes.LookupNoResultBox}>
      <div className={classes.LookupNoResultContent}>
        <img src={icon_no_result} alt="icon_no_result" className={classes.LookupNoResultImg} />
        <div className={classes.LookupNoResultMessage}>검색 결과가 없습니다.</div>
      </div>
    </div>
  );
};

export default LookupNoResult;
