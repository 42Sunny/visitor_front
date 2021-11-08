import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import classes from 'assets/styles/Reserve/ReserveSubmit.module.css';
import { updateReserve } from 'tools/apiHandler';
import { createReserve } from 'tools/apiHandler';
import dateToJsonTime from 'tools/dateToJsonTime';
import ReserveResult from './ReserveResult';
import Loading from '../Common/Loading';

const SUBMIT_TEXT = '신청';

const VReserveSubmit = React.memo(
  ({ isSubmitButtonAcitve, handleClick, isOpen, reserveId, isLoading }) => (
    <>
      <button
        className={classes.SubmitButton}
        disabled={!isSubmitButtonAcitve}
        onClick={handleClick}
      >
        {SUBMIT_TEXT}
      </button>
      <ReserveResult isOpen={isOpen} reserveId={reserveId} />
      <Loading isHidden={!isLoading} />
    </>
  ),
);

const sendCreateReserve = (date, place, purpose, targetStaffName, visitors) => {
  const newVistors = visitors.map((elem) => ({
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

const sendUpdateReserve = (date, place, purpose, targetStaffName, visitors) => {
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

const ReserveSubmit = () => {
  const {
    date,
    place,
    purpose,
    targetStaffName,
    visitors,
    isSubmitButtonAcitve,
    setIsSubmitButtonAcitve,
  } = useContext(ReserveContext);

  const [isOpen, setIsOpen] = useState(false);
  const [reserveId, setReserveId] = useState(-1);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const reserveSubmitProps = {
    isOpen,
    isLoading,
    reserveId,
    isSubmitButtonAcitve,
    handleClick: useCallback(async () => {
      const postApi = location.state ? sendUpdateReserve : sendCreateReserve;

      setIsSubmitButtonAcitve(false);
      setIsLoading(true);
      const { data } = await postApi(date, place, purpose, targetStaffName, visitors);
      if (data.error) {
        let errorMessage = 'empty error message';
        if (Array.isArray(data.error.message)) {
          errorMessage = data.error.map(({ message }) => message).join('\n');
        } else {
          errorMessage = data.error.message;
        }
        window.alert(errorMessage);
      } else {
        const { reserveId } = data;
        setReserveId(reserveId);
        setIsOpen(true);
      }
      setIsLoading(false);
    }, [date, location.state, place, purpose, setIsSubmitButtonAcitve, targetStaffName, visitors]),
  };

  return <VReserveSubmit {...reserveSubmitProps} />;
};

export default ReserveSubmit;
