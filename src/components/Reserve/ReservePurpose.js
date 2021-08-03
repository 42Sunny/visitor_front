import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useEffect, useState } from 'react';
import { ReserveBox, ReserveInputBox, ReserveBoxTitle, ReserveInput } from './Reserve';
import styles from 'styles/ReservePage.module.css';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { useLocation } from 'react-router-dom';

const ReservePurpose = () => {
  const { purpose, setPurpose, purposeError } = useContext(ReserveContext);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [selected, setSelected] = useState('');
  const location = useLocation();

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
    <ReserveBox>
      <ReserveBoxTitle>
        목적 <ReserveStar />
      </ReserveBoxTitle>
      <ReserveInputBox>
        <select
          name="purpose"
          onChange={handleSelect}
          className={styles.ReserveInputSelect}
          value={selected}
        >
          <option value="">방문 목적을 선택해주세요</option>
          <option value="멘토링">멘토링</option>
          <option value="회의">회의</option>
          <option value="directInput">직접 입력</option>
        </select>
      </ReserveInputBox>
      {isDirectInput && (
        <ReserveInputBox className={styles.ReserveInputPurpose}>
          <ReserveInput
            placeholder="방문 목적을 입력해주세요"
            className={styles.ReserveInput}
            onChange={handleChange}
            value={purpose}
          />
        </ReserveInputBox>
      )}
      {purposeError && <ReserveError>필수 정보입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReservePurpose;
