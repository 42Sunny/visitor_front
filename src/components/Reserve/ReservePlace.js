import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import styles from 'styles/ReservePage.module.css';
import { ReserveBox, ReserveBoxTitle } from './Reserve';
import ReserveStar from './ReserveStar';

const ReservePlace = () => {
  const { place, setPlace } = useContext(ReserveContext);

  const handleClick = (event) => {
    const {
      target: { value, innerText },
    } = event;
    if (value) setPlace(value);
    else setPlace(innerText);
  };

  return (
    <ReserveBox className={styles.ReservePlace}>
      <ReserveBoxTitle>
        장소 <ReserveStar />
      </ReserveBoxTitle>
      <div className={styles.ReservePlaceContent}>
        <div className={styles.ReservePlaceInputBox}>
          <button value="개포" onClick={handleClick} className={styles.ReservePlaceInputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="개포"
              checked={place === '개포'}
              onChange={handleClick}
              className={styles.ReservePlaceInput}
            />
            <label>개포</label>
          </button>
        </div>
        <div className={styles.ReservePlaceInputBox}>
          <button value="서초" onClick={handleClick} className={styles.ReservePlaceInputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="서초"
              checked={place === '서초'}
              onChange={handleClick}
              className={styles.ReservePlaceInput}
            />
            <label>서초</label>
          </button>
        </div>
      </div>
    </ReserveBox>
  );
};

export default ReservePlace;
