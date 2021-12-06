import React, { useState, useContext } from 'react';
import classes from 'assets/styles/LookupPage.module.css';
import { useHistory } from 'react-router';
import { deleteReserve } from 'tools/API';
import LookupDeleteModal from './LookupDeleteModal';
import { LookupContext } from 'contexts/LookupContext';

type PropTypes = {
  place: string;
  targetStaffName: string;
  purpose: string;
  date: string;
  reserveId: number;
  reserve: Reserve;
  editable: boolean;
};

const LookupResult = ({
  place,
  targetStaffName,
  purpose,
  date,
  reserveId,
  reserve,
  editable,
}: PropTypes) => {
  const { reserves, setReserves } = useContext(LookupContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const history = useHistory();

  const handleDeleteClick = () => {
    handleModalOpen();
  };

  const handleDelete = () => {
    deleteReserve(reserveId).then(() => {
      const newReserve = reserves.filter((reserve) => reserve.visitors[0].reserveId !== reserveId);
      setReserves?.(newReserve);
    });
  };

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleUpdateClick = () => {
    history.push({
      pathname: '/reserve',
      state: { ...reserve },
    });
  };

  return (
    <>
      <div className={classes.LookupCardBox}>
        <div className={classes.LookupCardContent}>
          <div className={classes.LookupCardRow}>
            <div className={classes.LookupCardRowTitle}>방문 날짜</div>
            <div className={classes.LookupCardRowContent}>{date}</div>
          </div>
          <div className={classes.LookupCardRow}>
            <div className={classes.LookupCardRowTitle}>장소</div>
            <div className={classes.LookupCardRowContent}>{place}</div>
          </div>
          <div className={classes.LookupCardRow}>
            <div className={classes.LookupCardRowTitle}>방문 대상</div>
            <div className={classes.LookupCardRowContent}>{targetStaffName}</div>
          </div>
          <div className={classes.LookupCardRow}>
            <div className={classes.LookupCardRowTitle}>방문 목적</div>
            <div className={classes.LookupCardRowContent}>{purpose}</div>
          </div>
        </div>
        <div className={classes.LookupCardButtons}>
          <button
            className={classes.LookupCardDeleteButton}
            onClick={handleDeleteClick}
            hidden={!editable}
          >
            삭제
          </button>
          <button
            className={classes.LookupCardUpdateButton}
            onClick={handleUpdateClick}
            hidden={!editable}
          >
            수정
          </button>
        </div>
      </div>
      <LookupDeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalClose}
        onDeleteButtonClick={handleDelete}
        onCancelButtonClick={handleModalClose}
      />
    </>
  );
};

export default LookupResult;
