import React from 'react';
import classes from 'assets/styles/LookupPage.module.css';
import LookupResult from './LookupResult';

type PropTypes = {
  reserves: reserve[];
};

const LookupResults = ({ reserves }: PropTypes) => {
  return (
    <div className={classes.LookupCardsBox}>
      <div className={classes.LookupCardsHeader}>총 {reserves.length}건</div>
      <div className={classes.LookupCardsContent}>
        {reserves.map((reserve) => (
          <LookupResult
            key={reserve.visitors[0].reserveId}
            reserve={reserve}
            reserveId={reserve.visitors[0].reserveId}
            date={reserve.date}
            place={reserve.place}
            targetStaffName={reserve.staff.name}
            purpose={reserve.purpose}
          />
        ))}
      </div>
    </div>
  );
};

export default LookupResults;
