import BigTitle from 'components/Common/BigTitle';
import WhiteBox from 'components/Common/WhiteBox';
import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import classes from 'styles/Reserve/ReservePlace.module.css';
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
    <WhiteBox isGrid>
      <BigTitle>
        장소 <ReserveStar />
      </BigTitle>
      <div className={classes.InputContent}>
        <div className={classes.InputBox}>
          <button value="개포" onClick={handleClick} className={classes.InputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="개포"
              onChange={handleClick}
              checked={place === '개포'}
              className={classes.Input}
            />
            <label className={classes.Label}>개포</label>
          </button>
        </div>
        <div className={classes.InputBox}>
          <button value="서초" onClick={handleClick} className={classes.InputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="서초"
              onChange={handleClick}
              checked={place === '서초'}
              className={classes.Input}
            />
            <label className={classes.Label}>서초</label>
          </button>
        </div>
      </div>
    </WhiteBox>
  );
};

export default ReservePlace;
