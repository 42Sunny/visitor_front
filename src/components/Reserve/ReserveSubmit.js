import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useState } from 'react';

import { useLocation } from 'react-router-dom';
import classes from 'assets/styles/Reserve/ReserveSubmit.module.css';
import { updateReserve } from 'tools/apiHandler';
import { postError } from 'tools/apiHandler';
import { createReserve } from 'tools/apiHandler';
import dateToJsonTime from 'tools/dateToJsonTime';
import ReserveResult from './ReserveResult';

const sendCreateReserve = async (date, place, purpose, targetStaffName, visitor) => {
  const newVistor = visitor.map((vis) => ({
    name: vis.name,
    organization: vis.organization,
    phone: vis.phone,
  }));
  const data = {
    date: dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    visitor: newVistor,
  };
  const result = await createReserve(data);
  return result;
};

const sendUpdateReserve = async (date, place, purpose, targetStaffName, visitor) => {
  const newVistor = visitor.map((vis) => ({
    name: vis.name,
    organization: vis.organization,
    phone: vis.phone,
    reserveId: visitor[0].reserveId,
    isChanged: vis.isChanged,
  }));
  const data = {
    date: dateToJsonTime(date),
    place,
    purpose,
    targetStaffName,
    reserveId: visitor[0].reserveId,
    visitor: newVistor,
  };
  const result = await updateReserve(data);
  return result;
};

const isFullVisitor = (visitor) => {
  const result = visitor.every(
    (vis) => vis.name !== '' && vis.phone !== '' && vis.organization !== '',
  );
  return result;
};

const checkData = ({
  date,
  place,
  purpose,
  targetStaffName,
  visitor,
  isPolicyChecked,
  setDateError,
  setPlaceError,
  setPurposeError,
  setTargetStaffNameError,
  setVisitorError,
  invalidTargetStaffName,
}) => {
  setDateError(date === '');
  setPlaceError(place === '');
  setPurposeError(purpose === '');
  setTargetStaffNameError(targetStaffName === '');
  setVisitorError(isFullVisitor(visitor) === false);
  if (targetStaffName === '') return false;
  if (purpose === '') return false;
  if (place === '') return false;
  if (date === '') return false;
  if (isFullVisitor(visitor) === false) return false;
  if (isPolicyChecked === false) return false;
  if (invalidTargetStaffName) return false;
  return true;
};

const ReserveSubmit = () => {
  const {
    date,
    place,
    purpose,
    targetStaffName,
    visitor,
    isPolicyChecked,
    setDateError,
    setPlaceError,
    setPurposeError,
    setTargetStaffNameError,
    setVisitorError,
    setIsPolicyChecked,
  } = useContext(ReserveContext);
  const [isOpen, setIsOpen] = useState(false);
  const [reserveId, setReserveId] = useState(-1);
  const location = useLocation();

  const postErrorHandler = (error) => {
    if (error.response) {
      const {
        response,
        response: { status },
      } = error;
      const inputData = {
        date,
        place,
        purpose,
        targetStaffName,
        visitor,
      };
      const payload = { response, inputData };
      const data = { status, payload };
      postError(data);
    }
  };

  const checkPostData = (data) => {
    const {
      data: { reserveId },
    } = data;
    if (
      checkData({
        date,
        place,
        purpose,
        targetStaffName,
        visitor,
        isPolicyChecked,
        setDateError,
        setPlaceError,
        setPurposeError,
        setTargetStaffNameError,
        setVisitorError,
      }) === true
    ) {
      setIsOpen(true);
      setReserveId(reserveId);
    }
  };

  const handleClick = async () => {
    let callApi = sendCreateReserve;

    setIsPolicyChecked(false);
    if (location.state) callApi = sendUpdateReserve;
    await callApi(date, place, purpose, targetStaffName, visitor)
      .then((response) => {
        const {
          data: { error },
        } = response;
        if (!error) {
          checkPostData(response);
        }
      })
      .catch(postErrorHandler)
      .then(() => {
        checkData({
          date,
          place,
          purpose,
          targetStaffName,
          visitor,
          isPolicyChecked,
          setDateError,
          setPlaceError,
          setPurposeError,
          setTargetStaffNameError,
          setVisitorError,
        });
        setIsPolicyChecked(true);
      });
  };

  return (
    <>
      <button className={classes.SubmitButton} disabled={!isPolicyChecked} onClick={handleClick}>
        신청
      </button>
      <ReserveResult isOpen={isOpen} reserveId={reserveId} />
    </>
  );
};

export default ReserveSubmit;
