import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from 'assets/styles/Reserve/ReservePurpose.module.css';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';

const DIRECT_INPUT = 'direct_input';

const ReservePurpose = () => {
  const { purpose, setPurpose, errorPurposeMessage } = useContext(ReserveContext);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [selected, setSelected] = useState('');
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
    setSelected(value);
    if (value === DIRECT_INPUT) {
      purposeInput.current.focus();
      setPurpose('');
    }
  };

  useEffect(() => {
    if (purpose !== '') {
      if (purpose === '회의' || purpose === '멘토링') {
        setSelected(purpose);
      } else {
        setSelected(DIRECT_INPUT);
      }
    }
  }, [purpose]);

  useEffect(() => {
    setIsDirectInput(selected === DIRECT_INPUT);
    if (selected !== DIRECT_INPUT) {
      setPurpose(selected);
    }
  }, [selected, setPurpose]);

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
          <option value={DIRECT_INPUT}>직접 입력</option>
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
      <ReserveError>{errorPurposeMessage}</ReserveError>
    </WhiteBox>
  );
};

export default ReservePurpose;
