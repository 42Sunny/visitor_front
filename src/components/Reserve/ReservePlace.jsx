import WhiteBox from 'components/Common/WhiteBox';
import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useCallback } from 'react';
import classes from 'assets/styles/Reserve/ReservePlace.module.css';
import ReserveBigTitle from './ReserveBigTitle';

const PLACE_TITLE = '장소';

const ReservePlace = () => {
  const { place, setPlace } = useContext(ReserveContext);

  const onChange = useCallback(
    (event) => {
      const {
        target: { value, innerText },
      } = event;
      if (value) setPlace(value);
      else setPlace(innerText);
    },
    [setPlace],
  );

  const placeProps = { place, onChange };

  return <VReservePlace {...placeProps} />;
};

const VReservePlace = React.memo(({ onChange, place }) => {
  return (
    <WhiteBox isGrid>
      <ReserveBigTitle title={PLACE_TITLE} />
      <div className={classes.InputContent}>
        <div className={classes.InputBox}>
          <button value="개포" onClick={onChange} className={classes.InputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="개포"
              onChange={onChange}
              checked={place === '개포'}
              className={classes.Input}
            />
            <label className={classes.Label}>개포</label>
          </button>
        </div>
        <div className={classes.InputBox}>
          <button value="서초" onClick={onChange} className={classes.InputButton}>
            <input
              type="radio"
              name="reservePlace"
              value="서초"
              onChange={onChange}
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
