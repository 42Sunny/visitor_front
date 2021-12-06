import React, { useState, useEffect } from 'react';
import classes from 'assets/styles/LookupPage.module.css';
import LookupResult from './LookupResult';
import classNames from 'classnames';
import { compareNow } from 'hooks/useDate';

const OPEN_EXPIRED_MESSAGE = '지난 예약 숨기기 <';
const CLOSE_EXPIRED_MESSAGE = '지난 예약 보기 >';

type PropTypes = {
  reserves: Reserve[];
};

const LookupResults = ({ reserves }: PropTypes) => {
  const [openExpired, setOpenExied] = useState(false);
  const handleClickExpiredToggle = () => setOpenExied(!openExpired);
  const [expiredReserves, setExpriedReserves] = useState<Reserve[]>([]);
  const [openReserves, setOpenReserves] = useState<Reserve[]>([]);

  useEffect(() => {
    const expiredReserves = reserves.filter(
      (reserve) => compareNow(new Date(reserve.date.replace(/-/g, '/'))) < 0,
    );
    const openReserves = reserves.filter(
      (reserve) => compareNow(new Date(reserve.date.replace(/-/g, '/'))) >= 0,
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
            editable={true}
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
            editable={false}
          />
        ))}
      </div>
    </div>
  );
};

export default LookupResults;
