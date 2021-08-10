import React, { useContext, useState } from 'react';
import icon_no_result from 'images/icon_no_result.svg';
import styles from 'styles/LookupPage.module.css';
import { LookupContext } from 'contexts/LookupContext';
import { deleteReserve } from 'tools/apiHandler';
import { useHistory } from 'react-router-dom';
import ReactModal from 'react-modal';

const LookupDeleteModal = ({
  isOpen,
  onRequestClose,
  onDeleteButtonClick,
  onCancelButtonClick,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.LookupDeleteModal}
      ariaHideApp={false}
    >
      <div className={styles.LookupDeleteModalBox}>
        <div className={styles.LookupDeleteModalHeader}>
          <div>예약을</div>
          <div>삭제하시겠습니까?</div>
        </div>
        <div className={styles.LookupDeleteModalContent}>
          <button onClick={onDeleteButtonClick} className={styles.LookupDeleteModalDeleteButton}>
            삭제
          </button>
          <button onClick={onCancelButtonClick} className={styles.LookupDeleteModalCancelButton}>
            취소
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

const LookupNoResult = () => {
  return (
    <div className={styles.LookupNoResultBox}>
      <div className={styles.LookupNoResultContent}>
        <img src={icon_no_result} alt="icon_no_result" className={styles.LookupNoResultImg} />
        <div className={styles.LookupNoResultMessage}>검색 결과가 없습니다.</div>
      </div>
    </div>
  );
};

const LookupCard = ({ place, targetStaffName, purpose, date, reserveId, result }) => {
  const { reserve, setReserve } = useContext(LookupContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const history = useHistory();

  const handleDeleteClick = () => {
    handleModalOpen();
  };

  const handleDelete = () => {
    const name = result.visitor[0].name;
    const phone = result.visitor[0].phone;
    deleteReserve(name, phone, reserveId).then(() => {
      const newReserve = reserve.filter((res) => res.visitor[0].reserveId !== reserveId);
      setReserve(newReserve);
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
      state: { ...result, isUpdate: true },
    });
  };

  return (
    <>
      <div className={styles.LookupCardBox}>
        <div className={styles.LookupCardContent}>
          <div className={styles.LookupCardRow}>
            <div className={styles.LookupCardRowTitle}>방문 날짜</div>
            <div className={styles.LookupCardRowContent}>{date}</div>
          </div>
          <div className={styles.LookupCardRow}>
            <div className={styles.LookupCardRowTitle}>장소</div>
            <div className={styles.LookupCardRowContent}>{place}</div>
          </div>
          <div className={styles.LookupCardRow}>
            <div className={styles.LookupCardRowTitle}>방문 대상</div>
            <div className={styles.LookupCardRowContent}>{targetStaffName}</div>
          </div>
          <div className={styles.LookupCardRow}>
            <div className={styles.LookupCardRowTitle}>방문 목적</div>
            <div className={styles.LookupCardRowContent}>{purpose}</div>
          </div>
        </div>
        <div className={styles.LookupCardButtons}>
          <button className={styles.LookupCardDeleteButton} onClick={handleDeleteClick}>
            삭제
          </button>
          <button className={styles.LookupCardUpdateButton} onClick={handleUpdateClick}>
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

const LookupCards = ({ results }) => {
  return (
    <div className={styles.LookupCardsBox}>
      <div className={styles.LookupCardsHeader}>총 {results.length}건</div>
      <div className={styles.LookupCardsContent}>
        {results.map((result) => (
          <LookupCard
            key={result.visitor[0].reserveId}
            result={result}
            reserveId={result.visitor[0].reserveId}
            date={result.date}
            place={result.place}
            targetStaffName={result.staff.name}
            purpose={result.purpose}
          />
        ))}
      </div>
    </div>
  );
};

const LookupResult = () => {
  const { reserve } = useContext(LookupContext);

  return (
    <>
      {reserve !== null &&
        (reserve.length === 0 ? <LookupNoResult /> : <LookupCards results={reserve} />)}
    </>
  );
};

export default LookupResult;
