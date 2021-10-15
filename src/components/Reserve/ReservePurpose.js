import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from 'assets/styles/Reserve/ReservePurpose.module.css';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { useLocation } from 'react-router-dom';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';

const ReservePurpose = () => {
  const { purpose, setPurpose, purposeError } = useContext(ReserveContext);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [selected, setSelected] = useState('');
  const location = useLocation();
  const purposeInput = useRef();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPurpose(value);
  };

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    if (value === 'directInput') {
      setPurpose('');
      setSelected('directInput');
      setIsDirectInput(true);
    } else {
      setPurpose(value);
      setSelected(value);
      setIsDirectInput(false);
    }
  };

  useEffect(() => {
    if (!location.state && isDirectInput) purposeInput.current.focus();
  }, [isDirectInput, location.state]);

  useEffect(() => {
    if (location.state) {
      const {
        state: { purpose },
      } = location;
      if (!(purpose === '회의' || purpose === '멘토링')) {
        setSelected('directInput');
        setPurpose(purpose);
        setIsDirectInput(true);
      } else {
        setSelected(purpose);
        setPurpose(purpose);
        setIsDirectInput(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WhiteBox isGrid>
      <BigTitle>
        목적 <ReserveStar />
      </BigTitle>
      <GreyBox>
        <select
          name="purpose"
          onChange={handleSelect}
          className={classes.Selector}
          value={selected}
        >
          <option value="">방문 목적을 선택해주세요</option>
          <option value="멘토링">멘토링</option>
          <option value="회의">회의</option>
          <option value="directInput">직접 입력</option>
        </select>
      </GreyBox>
      <GreyBox hidden={!isDirectInput}>
        <input
          placeholder="방문 목적을 입력해주세요"
          onChange={handleChange}
          value={purpose}
          ref={purposeInput}
          hidden={!isDirectInput}
        />
      </GreyBox>
      {purposeError && <ReserveError>필수 정보입니다.</ReserveError>}
    </WhiteBox>
  );
};

export default ReservePurpose;
