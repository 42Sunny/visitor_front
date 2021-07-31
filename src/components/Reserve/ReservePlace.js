import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import styles from 'styles/ReservePage.module.css';
import { ReserveBox, ReserveBoxTitle } from './Reserve';
import ReserveStar from './ReserveStar';

const ReservePlace = () => {
  const { place, setPlace } = useContext(ReserveContext);

  const handleClick = (event) => {
    const {
      target: { value },
    } = event;
    setPlace(value);
  };

  return (
    <ReserveBox className={styles.ReservePlace}>
      <ReserveBoxTitle>
        장소 <ReserveStar />
      </ReserveBoxTitle>
      <div className={styles.ReservePlaceContent}>
        <div className={styles.ReservePlaceInputBox}>
          <input
            type="radio"
            name="reservePlace"
            value="개포"
            defaultChecked={place === '개포'}
            onClick={handleClick}
            className={styles.ReservePlaceInput}
          />
          <label>개포</label>
        </div>
        <div className={styles.ReservePlaceInputBox}>
          <input
            type="radio"
            name="reservePlace"
            value="서초"
            defaultChecked={place === '서초'}
            onClick={handleClick}
            className={styles.ReservePlaceInput}
          />
          <label>서초</label>
        </div>
      </div>
    </ReserveBox>
  );
};

export default ReservePlace;
