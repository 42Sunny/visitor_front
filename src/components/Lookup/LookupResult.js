import React, { useContext } from 'react';
import icon_no_result from 'images/icon_no_result.svg';
import styles from 'styles/LookupPage.module.css';
import { LookupContext } from 'contexts/LookupContext';
import { deleteReserve } from 'tools/apiHandler';

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
  const handleDeleteClick = () => {
    const name = result.visitor[0].name;
    const phone = result.visitor[0].phone;
    //TODO: 서버에서 자료를 다시 받아올 필요가 있어보인다.
    deleteReserve(name, phone, reserveId);
    const newReserve = reserve.filter((res) => res.visitor[0].reserveId !== reserveId);
    setReserve(newReserve);
  };

  return (
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
        {/* <button className={styles.LookupCardUpdateButton}>수정</button> */}
      </div>
    </div>
  );
};

const LookupCards = ({ result }) => {
  return (
    <div className={styles.LookupCardsBox}>
      <div className={styles.LookupCardsHeader}>총 {result.length}건</div>
      <div className={styles.LookupCardsContent}>
        {result.map((res) => (
          <LookupCard
            key={res.visitor[0].reserveId}
            result={res}
            reserveId={res.visitor[0].reserveId}
            date={res.date}
            place={res.place}
            targetStaffName={res.staff.name}
            purpose={res.purpose}
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
        (reserve.length === 0 ? <LookupNoResult /> : <LookupCards result={reserve} />)}
    </>
  );
};

export default LookupResult;
