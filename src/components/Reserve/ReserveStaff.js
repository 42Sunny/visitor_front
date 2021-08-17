import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useEffect } from 'react';
import { checkStaff } from 'tools/apiHandler';
import { ReserveBox, ReserveBoxTitle, ReserveInput, ReserveInputBox } from './Reserve';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';

const ReserveStaff = () => {
  const {
    targetStaffName,
    setTargetStaffName,
    targetStaffNameError,
    setInvalidTargetStaffName,
    invalidTargetStaffName,
  } = useContext(ReserveContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTargetStaffName(value);
  };

  const sendStaffName = () => {
    if (targetStaffName !== '') {
      checkStaff(targetStaffName)
        .then((res) => {
          const { data } = res;
          setInvalidTargetStaffName(data !== true);
        })
        .catch(() => {
          //TODO: postError
        });
    }
  };

  useEffect(sendStaffName, [setInvalidTargetStaffName, targetStaffName]);

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
          onBlur={sendStaffName}
        />
      </ReserveInputBox>
      {targetStaffNameError && <ReserveError>필수 정보입니다.</ReserveError>}
      {invalidTargetStaffName && <ReserveError>등록되지 않은 직원입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReserveStaff;
