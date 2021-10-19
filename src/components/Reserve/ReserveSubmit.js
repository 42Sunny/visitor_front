import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classes from 'assets/styles/Reserve/ReserveSubmit.module.css';
import { updateReserve } from 'tools/apiHandler';
import { createReserve } from 'tools/apiHandler';
import dateToJsonTime from 'tools/dateToJsonTime';
import ReserveResult from './ReserveResult';

const sendCreateReserve = (date, place, purpose, targetStaffName, visitor) => {
  const newVistor = visitor.map((elem) => ({
    name: elem.name,
    organization: elem.organization,
    phone: elem.phone,
  }));
  const data = {
    date: dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    visitor: newVistor,
  };
  return createReserve(data);
};

const sendUpdateReserve = (date, place, purpose, targetStaffName, visitor) => {
  const newVistor = visitor.map((elem) => ({
    name: elem.name,
    organization: elem.organization,
    phone: elem.phone,
    reserveId: visitor[0].reserveId,
    isChanged: elem.isChanged,
  }));
  const data = {
    date: dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    reserveId: visitor[0].reserveId,
    visitor: newVistor,
  };
  return updateReserve(data);
};

const ReserveSubmit = () => {
  const {
    date,
    place,
    purpose,
    targetStaffName,
    visitor,
    isSubmitButtonAcitve,
    setIsSubmitButtonAcitve,
  } = useContext(ReserveContext);
  const [isOpen, setIsOpen] = useState(false);
  const [reserveId, setReserveId] = useState(-1);
  const location = useLocation();

  const handleClick = async () => {
    let callApi = location.state ? sendUpdateReserve : sendCreateReserve;

    setIsSubmitButtonAcitve(false);
    const { data } = await callApi(date, place, purpose, targetStaffName, visitor);
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
  };

  return (
    <>
      <button
        className={classes.SubmitButton}
        disabled={!isSubmitButtonAcitve}
        onClick={handleClick}
      >
        신청
      </button>
      <ReserveResult isOpen={isOpen} reserveId={reserveId} />
    </>
  );
};

export default ReserveSubmit;
