import React from 'react';
import ReactModal from 'react-modal';
import styles from 'styles/ReservePage.module.css';

const policy = [
  'Ⅰ. 개인정보의 수집 및 이용 동의서',
  '- 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.',
  '',
  '① 개인정보 수집 항목 및 수집·이용 목적',
  '가) 수집 항목 (필수항목)',
  '- 성명(국문), 연락처(휴대전화)',
  '신청서에 기재된 정보 또는 신청자가 제공한 정보',
  '나) 수집 및 이용 목적',
  '- 42이노베이션 아카데미 방문 예약 서비스 진행',
  '- 42이노베이션 아카데미 방문 예약자와의 연락',
  '',
  '② 개인정보 보유 및 이용기간',
  '- 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지',
  '',
  '③ 동의거부관리',
  '- 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,',
  '귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 해당 서비스를 사용할 수 없음을',
  '알려드립니다.',
];

const ReservePolicyDetail = ({ isOpen, onRequestClose, onButtonClick }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.ReserveModalBox}
      ariaHideApp={false}
    >
      <div className={styles.ReservePolicyDetailBox}>
        <div className={styles.ReservePolicyDetailHeader}>이용 약관</div>
        <div className={styles.ReservePolicyDetailContent}>
          {policy.map((content, idx) => (
            <div key={idx} className={styles.ReservePolicyDetailDiv}>
              {content}
            </div>
          ))}
        </div>
        <div className={styles.ReservePolicyDetailFooter}>
          <button onClick={onButtonClick} className={styles.ReservePolicyDetailButton}>
            동의하고 확인
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ReservePolicyDetail;
