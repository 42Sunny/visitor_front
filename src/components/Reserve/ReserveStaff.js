import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import { checkStaff } from 'tools/apiHandler';
import { ReserveBox, ReserveBoxTitle, ReserveInput, ReserveInputBox } from './Reserve';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { debounce } from 'lodash';
import { postError } from 'tools/apiHandler';

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

  const sendStaffName = debounce((event) => {
    if (targetStaffName !== '') {
      checkStaff(targetStaffName)
        .then((res) => {
          const { data } = res;
          const check = data.hasOwnProperty('error');
          setInvalidTargetStaffName(check);
        })
        .catch((err) => {
          const {
            response: { data, status },
          } = err;
          postError(status, data);
        });
    }
  }, 500);

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
          onKeyUp={sendStaffName}
          onBlur={sendStaffName}
        />
      </ReserveInputBox>
      {targetStaffNameError && <ReserveError>필수 정보입니다.</ReserveError>}
      {invalidTargetStaffName && <ReserveError>등록되지 않은 직원입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReserveStaff;
