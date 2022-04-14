import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useState, useCallback, useMemo } from 'react';
import classes from 'assets/styles/Reserve/ReserveSubmit.module.css';
import { updateReserve } from 'tools/API';
import { createReserve } from 'tools/API';
import dateToJsonTime from 'tools/dateToJsonTime';
import ReserveResultModal from './ReserveResultModal';
import Loading from '../Common/Loading';

type PropTypes = {
  isOpen: boolean;
  reserveId: number;
  isLoading: boolean;
  isUpdatePage: boolean;
  isSubmitButtonAcitve: boolean;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
};

const SUBMIT_TEXT = '신청';

const ReserveSubmit = () => {
  const {
    date,
    place,
    purpose,
    visitors,
    isUpdatePage,
    targetStaffName,
    isSubmitButtonAcitve,
    representative,
    checkDate,
    checkPurpose,
    checkVisitors,
    checkTargetStaffName,
    setIsSubmitButtonAcitve,
  } = useContext(ReserveContext);

  const [isOpen, setIsOpen] = useState(false);
  const [reserveId, setReserveId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const submitData = useMemo(
    () => (isUpdatePage ? sendUpdateReserve : sendCreateReserve),
    [isUpdatePage],
  );

  const checkValues = useCallback(
    (date, purpose, visitors, targetStaffName) => {
      checkDate(date);
      checkPurpose(purpose);
      checkVisitors(visitors);
      checkTargetStaffName(targetStaffName);
    },
    [checkDate, checkPurpose, checkTargetStaffName, checkVisitors],
  );

  const reserveSubmitProps = {
    isOpen,
    isLoading,
    reserveId,
    isUpdatePage,
    isSubmitButtonAcitve,
    handleClick: useCallback(async () => {
      setIsLoading(true);
      setIsSubmitButtonAcitve(false);
      checkValues(date, purpose, visitors, targetStaffName);
      const { data } = await submitData(
        date,
        place,
        purpose,
        targetStaffName,
        visitors,
        representative ? 'REPRESENTATIVE' : 'DEFAULT',
      );
      if (data.hasOwnProperty('error') || data.hasOwnProperty('errors')) {
        alertError(data.message);
      } else {
        setReserveId(!isUpdatePage ? data.reserveId : visitors[0].reserveId);
        setIsOpen(true);
      }
      setIsLoading(false);
      setIsSubmitButtonAcitve(true);
    }, [
      setIsSubmitButtonAcitve,
      checkValues,
      date,
      purpose,
      visitors,
      targetStaffName,
      submitData,
      place,
      representative,
      isUpdatePage,
    ]),
  };

  return <VReserveSubmit {...reserveSubmitProps} />;
};

const VReserveSubmit = React.memo(
  ({
    isSubmitButtonAcitve,
    handleClick,
    isOpen,
    reserveId,
    isLoading,
    isUpdatePage,
  }: PropTypes) => (
    <>
      <button
        className={classes.SubmitButton}
        disabled={!isSubmitButtonAcitve}
        onClick={handleClick}
      >
        {SUBMIT_TEXT}
      </button>
      <ReserveResultModal isOpen={isOpen} reserveId={reserveId} isUpdatePage={isUpdatePage} />
      <Loading isHidden={!isLoading} />
    </>
  ),
);

const sendCreateReserve = (
  date: Date | null,
  place: string,
  purpose: string,
  targetStaffName: string,
  visitors: Visitor[],
  type: 'DEFAULT' | 'REPRESENTATIVE',
) => {
  const newVistors: CompactVisitor[] = visitors.map((elem) => ({
    name: elem.name,
    organization: elem.organization,
    phone: elem.phone,
  }));

  const data = {
    date: date && dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    visitor: newVistors,
    type,
  };
  return createReserve(data);
};

const sendUpdateReserve = (
  date: Date | null,
  place: string,
  purpose: string,
  targetStaffName: string,
  visitors: Visitor[],
  type: 'DEFAULT' | 'REPRESENTATIVE',
) => {
  const newVistors = visitors.map((elem) => ({
    name: elem.name,
    organization: elem.organization,
    phone: elem.phone,
    reserveId: visitors[0].reserveId,
    isChanged: elem.isChanged,
  }));

  const data = {
    date: date && dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    reserveId: visitors[0].reserveId,
    visitor: newVistors,
    type,
  };
  return updateReserve(data);
};

type errorMessage = {
  message: string;
};

const alertError = (error: errorMessage[] | errorMessage) => {
  let errorMessage = 'empty error message';
  if (Array.isArray(error)) {
    errorMessage = error.map(({ message }) => message).join('\n');
  } else {
    errorMessage = error.message;
  }
  window.alert(errorMessage);
};

export default ReserveSubmit;
