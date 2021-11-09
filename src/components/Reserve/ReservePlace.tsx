import WhiteBox from 'components/Common/WhiteBox';
import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useCallback } from 'react';
import classes from 'assets/styles/Reserve/ReservePlace.module.css';
import ReserveBigTitle from './ReserveBigTitle';

type PropTypes = {
  place: string;
  changePlace: React.ReactEventHandler;
};

const PLACE_TITLE = '장소';

const ReservePlace = () => {
  const { place, setPlace } = useContext(ReserveContext);

  const changePlace = useCallback(
    (event) => {
      const {
        target: { value, innerText },
      } = event;
      if (value) setPlace(value);
      else setPlace(innerText);
    },
    [setPlace],
  );

  const placeProps = { place, changePlace };

  return <VReservePlace {...placeProps} />;
};

const VReservePlace = React.memo(({ changePlace, place }: PropTypes) => {
  return (
    <WhiteBox isGrid>
      <ReserveBigTitle title={PLACE_TITLE} />
      <div className={classes.InputContent}>
        <div className={classes.InputBox}>
          <button value="개포" onClick={changePlace} className={classes.InputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="개포"
              onChange={changePlace}
              checked={place === '개포'}
              className={classes.Input}
            />
            <label className={classes.Label}>개포</label>
          </button>
        </div>
        <div className={classes.InputBox}>
          <button value="서초" onClick={changePlace} className={classes.InputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="서초"
              onChange={changePlace}
              checked={place === '서초'}
              className={classes.Input}
            />
            <label className={classes.Label}>서초</label>
          </button>
        </div>
      </div>
    </WhiteBox>
  );
});

export default ReservePlace;
