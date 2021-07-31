import React from 'react';
import ReactModal from 'react-modal';
import styles from 'styles/ReservePage.module.css';

const policy = [
  'Ⅰ. 개인정보의 수집 및 이용 동의서',
  '- 이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는 사용되지 않습니다.',
  '① 개인정보 수집 항목 및 수집·이용 목적',
  '가) 수집 항목 (필수항목)',
  '- 성명(국문), 주민등록번호, 주소, 전화번호(자택, 휴대전화), 사진, 이메일, 나이, 재학정보, 병역사항,',
  '외국어 점수, 가족관계, 재산정도, 수상내역, 사회활동, 타 장학금 수혜현황, 요식업 종사 현황 등 지원',
  '신청서에 기재된 정보 또는 신청자가 제공한 정보',
  '나) 수집 및 이용 목적',
  '- 하이트진로 장학생 선발 전형 진행',
  '- 하이트진로 장학생과의 연락 및 자격확인',
  '- 하이트진로 장학생 자원관리',
  '② 개인정보 보유 및 이용기간',
  '- 수집·이용 동의일로부터 개인정보의 수집·이용목적을 달성할 때까지',
  '③ 동의거부관리',
  '- 귀하께서는 본 안내에 따른 개인정보 수집, 이용에 대하여 동의를 거부하실 권리가 있습니다. 다만,',
  '귀하가 개인정보의 수집/이용에 동의를 거부하시는 경우에 장학생 선발 과정에 있어 불이익이 발생할 수',
  '있음을 알려드립니다.',
];

const ReservePolicyDetail = ({ isOpen, onRequestClose }) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.ReserveModalBox}>
      <div className={styles.ReservePolicyDetailBox}>
        <div className={styles.ReservePolicyDetailHeader}>이용 약관</div>
        <div className={styles.ReservePolicyDetailContent}>
          {policy.map((content, idx) => (
            <div key={idx}>{content}</div>
          ))}
        </div>
        <div className={styles.ReservePolicyDetailFooter}>
          <button>확인</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ReservePolicyDetail;
