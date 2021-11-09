import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useCallback } from 'react';
import ReserveError from './ReserveError';
import WhiteBox from 'components/Common/WhiteBox';
import GreyBox from 'components/Common/GreyBox';
import TransparentInput from 'components/Common/TransparentInput';
import ReserveBigTitle from './ReserveBigTitle';

type PropTypes = {
  targetStaffName: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorTargetStaffNameMessage: string;
};

const STAFF_TITLE = '직원';
const STAFF_INPUT_PLACE_HOLDER = '방문할 직원의 이름을 입력해주세요';

const VReserveStaff = React.memo(
  ({ targetStaffName, onChange, errorTargetStaffNameMessage }: PropTypes) => (
    <WhiteBox isGrid>
      <ReserveBigTitle title={STAFF_TITLE} />
      <GreyBox>
        <TransparentInput
          placeholder={STAFF_INPUT_PLACE_HOLDER}
          value={targetStaffName}
          onChange={onChange}
        />
      </GreyBox>
      <ReserveError>{errorTargetStaffNameMessage}</ReserveError>
    </WhiteBox>
  ),
);

const ReserveStaff = () => {
  const { targetStaffName, setTargetStaffName, errorTargetStaffNameMessage } =
    useContext(ReserveContext);

  const reserveStaffProps = {
    targetStaffName,
    errorTargetStaffNameMessage,
    onChange: useCallback(
      (event) => {
        const {
          target: { value },
        } = event;
        setTargetStaffName(value);
      },
      [setTargetStaffName],
    ),
  };

  return <VReserveStaff {...reserveStaffProps} />;
};

export default ReserveStaff;
