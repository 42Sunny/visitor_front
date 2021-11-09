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
    setIsSubmitButtonAcitve,
  } = useContext(ReserveContext);

  const [isOpen, setIsOpen] = useState(false);
  const [reserveId, setReserveId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const submitData = useMemo(
    () => (isUpdatePage ? sendUpdateReserve : sendCreateReserve),
    [isUpdatePage],
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
      const { data } = await submitData(date, place, purpose, targetStaffName, visitors);
      if (data.hasOwnProperty('error')) {
        alertError(data.error);
      } else {
        setReserveId(!isUpdatePage ? data.reserveId : visitors[0].reserveId);
        setIsOpen(true);
      }
      setIsLoading(false);
      setIsSubmitButtonAcitve(true);
    }, [
      date,
      place,
      purpose,
      visitors,
      isUpdatePage,
      targetStaffName,
      submitData,
      setIsSubmitButtonAcitve,
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
  date: Date,
  place: string,
  purpose: string,
  targetStaffName: string,
  visitors: Visitor[],
) => {
  const newVistors: CompactVisitor[] = visitors.map((elem) => ({
    name: elem.name,
    organization: elem.organization,
    phone: elem.phone,
  }));

  const data = {
    date: dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    visitor: newVistors,
  };
  return createReserve(data);
};

const sendUpdateReserve = (
  date: Date,
  place: string,
  purpose: string,
  targetStaffName: string,
  visitors: Visitor[],
) => {
  const newVistors = visitors.map((elem) => ({
    name: elem.name,
    organization: elem.organization,
    phone: elem.phone,
    reserveId: visitors[0].reserveId,
    isChanged: elem.isChanged,
  }));

  const data = {
    date: dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    reserveId: visitors[0].reserveId,
    visitor: newVistors,
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
