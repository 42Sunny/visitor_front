import { ReserveContext } from 'contexts/ReserveContext';
import React, { useCallback, useContext, useEffect } from 'react';
import { checkStaff } from 'tools/apiHandler';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { debounce } from 'lodash';
import { postError } from 'tools/apiHandler';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';
import TransparentInput from 'components/Common/TransparentInput';

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
    <WhiteBox isGrid>
      <BigTitle>
        직원 <ReserveStar />
      </BigTitle>
      <GreyBox>
        <TransparentInput
          placeholder="방문할 직원의 이름을 입력해주세요"
          value={targetStaffName}
          onChange={handleChange}
        />
      </GreyBox>
      {targetStaffNameError && <ReserveError>필수 정보입니다.</ReserveError>}
      {invalidTargetStaffName && <ReserveError>등록되지 않은 직원입니다.</ReserveError>}
    </WhiteBox>
  );
};

export default ReserveStaff;
