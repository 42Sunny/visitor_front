import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useState } from 'react';
import { ReserveBox, ReserveInputBox, ReserveBoxTitle, ReserveInput } from './Reserve';
import styles from 'styles/ReservePage.module.css';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';

const ReservePurpose = () => {
  const { purpose, setPurpose, purposeError } = useContext(ReserveContext);
  const [isDirectInput, setIsDirectInput] = useState(false);

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
      setIsDirectInput(true);
    } else {
      setPurpose(value);
      setIsDirectInput(false);
    }
  };

  return (
    <ReserveBox>
      <ReserveBoxTitle>
        목적 <ReserveStar />
      </ReserveBoxTitle>
      <ReserveInputBox>
        <select name="purpose" onChange={handleSelect} className={styles.ReserveInputSelect}>
          <option value="">방문 목적을 선택해주세요</option>
          <option value="멘토링">멘토링</option>
          <option value="방문">방문</option>
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
