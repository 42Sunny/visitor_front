import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import { useHistory, useLocation } from 'react-router-dom';
import styles from 'styles/ReservePage.module.css';
import { updateReserve } from 'tools/apiHandler';
import { postError } from 'tools/apiHandler';
import { createReserve } from 'tools/apiHandler';
import dateToJsonTime from 'tools/dateToJsonTime';

const ResultModal = ({ isOpen }) => {
  const { visitor, place } = useContext(ReserveContext);
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.ResultModal}
      appElement={document.getElementById('app')}
    >
      {visitor.length === 0 ? (
        <div className={styles.ResultModalContent}>
          <div className={styles.ResultModalMeesage}>{`에러 발생(미구현)`}</div>
          <button className={styles.ResultModalButton} onClick={handleClick}>
            돌아가기
          </button>
        </div>
      ) : (
        <div className={styles.ResultModalContent}>
          <div className={styles.ResultModalMeesage}>{`${visitor[0].name}님 ${place}클러스터`}</div>
          <div className={styles.ResultModalMeesage}>{`방문 신청이 완료되었습니다.`}</div>
          <button className={styles.ResultModalButton} onClick={handleClick}>
            확인
          </button>
        </div>
      )}
    </ReactModal>
  );
};

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
  console.log(data);
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
  isChecked,
  setDateError,
  setPlaceError,
  setPurposeError,
  setTargetStaffNameError,
  setVisitorError,
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
  if (isChecked === false) return false;
  return true;
};

const ReserveSubmit = () => {
  const {
    date,
    place,
    purpose,
    targetStaffName,
    visitor,
    isChecked,
    setDateError,
    setPlaceError,
    setPurposeError,
    setTargetStaffNameError,
    setVisitorError,
  } = useContext(ReserveContext);
  const [isOpen, setIsOpen] = useState(false);
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
        response,
      };
      const payload = { response, inputData };
      const data = { status, payload };
      postError(data);
    }
  };

  const attemptPostData = () => {
    if (
      checkData({
        date,
        place,
        purpose,
        targetStaffName,
        visitor,
        isChecked,
        setDateError,
        setPlaceError,
        setPurposeError,
        setTargetStaffNameError,
        setVisitorError,
      }) === true
    ) {
      setIsOpen(true);
    }
  };

  const handleClick = async () => {
    let callApi = sendCreateReserve;

    if (location.state) callApi = sendUpdateReserve;
    await callApi(date, place, purpose, targetStaffName, visitor)
      .then((response) => attemptPostData())
      .catch(postErrorHandler)
      .then(() =>
        checkData({
          date,
          place,
          purpose,
          targetStaffName,
          visitor,
          isChecked,
          setDateError,
          setPlaceError,
          setPurposeError,
          setTargetStaffNameError,
          setVisitorError,
        }),
      );
  };

  return (
    <>
      <div className={styles.ReserveSubmitBox}>
        <button className={styles.ReserveSubmitButton} disabled={!isChecked} onClick={handleClick}>
          신청
        </button>
      </div>
      <ResultModal isOpen={isOpen} />
    </>
  );
};

export default ReserveSubmit;
