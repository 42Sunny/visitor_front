import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import { ReserveBox, ReserveBoxTitle, ReserveInput, ReserveInputBox } from './Reserve';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';

const ReserveStaff = () => {
  const { targetStaffName, setTargetStaffName, targetStaffNameError } = useContext(ReserveContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTargetStaffName(value);
  };

  return (
    <ReserveBox>
      <ReserveBoxTitle>
        직원 <ReserveStar />
      </ReserveBoxTitle>
      <ReserveInputBox>
        <ReserveInput
          placeholder="방문할 직원의 성함을 입력해주세요"
          value={targetStaffName}
          onChange={handleChange}
        />
      </ReserveInputBox>
      {targetStaffNameError && <ReserveError>필수 정보입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReserveStaff;
