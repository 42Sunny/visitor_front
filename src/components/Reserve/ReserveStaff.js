import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';
import TransparentInput from 'components/Common/TransparentInput';

const ReserveStaff = () => {
  const { targetStaffName, setTargetStaffName, errorTargetStaffNameMessage } =
    useContext(ReserveContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTargetStaffName(value);
  };

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
      <ReserveError>{errorTargetStaffNameMessage}</ReserveError>
    </WhiteBox>
  );
};

export default ReserveStaff;
