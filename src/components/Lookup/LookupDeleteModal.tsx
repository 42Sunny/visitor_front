import React from 'react';
import ReactModal from 'react-modal';
import classes from 'assets/styles/LookupPage.module.css';

type PropTypes = {
  isOpen: boolean;
  onRequestClose: any;
  onDeleteButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  onCancelButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const LookupDeleteModal = ({
  isOpen,
  onRequestClose,
  onDeleteButtonClick,
  onCancelButtonClick,
}: PropTypes) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.LookupDeleteModal}
      ariaHideApp={false}
    >
      <div className={classes.LookupDeleteModalBox}>
        <div className={classes.LookupDeleteModalHeader}>
          <div>예약을</div>
          <div>삭제하시겠습니까?</div>
        </div>
        <div className={classes.LookupDeleteModalContent}>
          <button onClick={onDeleteButtonClick} className={classes.LookupDeleteModalDeleteButton}>
            삭제
          </button>
          <button onClick={onCancelButtonClick} className={classes.LookupDeleteModalCancelButton}>
            취소
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default LookupDeleteModal;
