import { ReserveContext } from 'contexts/ReserveContext';
import React, { useCallback, useContext, useEffect } from 'react';
import { checkStaff } from 'tools/apiHandler';
import { ReserveBox, ReserveBoxTitle, ReserveInput, ReserveInputBox } from './Reserve';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { debounce } from 'lodash';
import { postError } from 'tools/apiHandler';

const IDLE_TIME_TARGET_STAFF = 200;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendTargetStaffName = useCallback(
    debounce((name) => {
      checkStaff(name)
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
    }, IDLE_TIME_TARGET_STAFF),
    [],
  );

  useEffect(() => {
    if (targetStaffName !== '') {
      sendTargetStaffName(targetStaffName);
    }
  }, [sendTargetStaffName, targetStaffName]);

  return (
    <ReserveBox>
      <ReserveBoxTitle>
        직원 <ReserveStar />
      </ReserveBoxTitle>
      <ReserveInputBox>
        <ReserveInput
          placeholder="방문할 직원의 이름을 입력해주세요"
          value={targetStaffName}
          onChange={handleChange}
        />
      </ReserveInputBox>
      {targetStaffNameError && <ReserveError>필수 정보입니다.</ReserveError>}
      {invalidTargetStaffName && <ReserveError>등록되지 않은 직원입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReserveStaff;
