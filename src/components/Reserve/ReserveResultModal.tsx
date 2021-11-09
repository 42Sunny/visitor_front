import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useMemo } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router';
import classes from 'assets/styles/Reserve/ReserveResultModal.module.css';

type PropTypes = {
  isOpen: boolean;
  isUpdatePage: boolean;
  reserveId: number;
};

const SUCCESS_UPDATE_TEXT = `방문 수정이 완료되었습니다.`;
const SUCCESS_RESERVE_TEXT = `방문 신청이 완료되었습니다.`;
const FINISH_TEXT = '확인';

const ReserveResultModal = ({ isOpen, reserveId, isUpdatePage }: PropTypes) => {
  const { visitors, place } = useContext(ReserveContext);
  const firstVisitorName = useMemo(() => visitors[0].name, [visitors]);
  const history = useHistory();

  const handleClick = () => {
    history.push({ pathname: `/reserve-info/${reserveId}`, state: { isSubmit: true } });
  };

  return (
    <ReactModal isOpen={isOpen} className={classes.ModalBox} ariaHideApp={false}>
      <div className={classes.Content}>
        <div>{`${firstVisitorName}님 ${place}클러스터`}</div>
        <div>{isUpdatePage ? SUCCESS_UPDATE_TEXT : SUCCESS_RESERVE_TEXT}</div>
        <button className={classes.CheckButton} onClick={handleClick}>
          {FINISH_TEXT}
        </button>
      </div>
    </ReactModal>
  );
};

export default React.memo(ReserveResultModal);
