import React, { useState, useEffect } from 'react';
import classes from 'assets/styles/LookupPage.module.css';
import LookupResult from './LookupResult';
import classNames from 'classnames';

const OPEN_EXPIRED_MESSAGE = '지난 예약 감추기 <';
const CLOSE_EXPIRED_MESSAGE = '지난 예약 보기 >';

type PropTypes = {
  reserves: reserve[];
};

const LookupResults = ({ reserves }: PropTypes) => {
  const [openExpired, setOpenExied] = useState(false);
  const handleClickExpiredToggle = () => setOpenExied(!openExpired);
  const [expiredReserves, setExpriedReserves] = useState<reserve[]>([]);
  const [openReserves, setOpenReserves] = useState<reserve[]>([]);

  useEffect(() => {
    const expiredReserves = reserves.filter(
      (reserve) => new Date(reserve.date.replace(/-/g, '/')) <= new Date(),
    );
    const openReserves = reserves.filter(
      (reserve) => new Date(reserve.date.replace(/-/g, '/')) > new Date(),
    );
    setExpriedReserves(expiredReserves);
    setOpenReserves(openReserves);
  }, [reserves]);

  return (
    <div className={classes.LookupCardsBox}>
      <div className={classes.LookupCardsHeader}>총 {openReserves.length}건</div>
      <div className={classes.LookupCardsContent}>
        {openReserves.map((reserve) => (
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
      {expiredReserves.length !== 0 && (
        <div className={classes.ExpiredReserveButton} onClick={handleClickExpiredToggle}>
          {openExpired ? OPEN_EXPIRED_MESSAGE : CLOSE_EXPIRED_MESSAGE}
        </div>
      )}
      <div
        className={classNames(classes.ExpiredReserveContainer, classes.LookupCardsContent, {
          [classes.Hidden]: !openExpired,
        })}
      >
        {expiredReserves.map((reserve) => (
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
