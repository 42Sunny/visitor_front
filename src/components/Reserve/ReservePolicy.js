import React, { useContext, useState } from 'react';
import { ReserveBox, ReserveBoxTitle } from './Reserve';
import styles from 'styles/ReservePage.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReservePolicyDetail from './ReservePolicyDetail';

const policyURL = 'https://www.privacy.go.kr/gud/pis/perRule.do';

const ReservePolicy = () => {
  const { setIsChecked } = useContext(ReserveContext);
  // eslint-disable-next-line no-unused-vars
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handleChange = (event) => {
    const {
      target: { checked },
    } = event;
    setIsChecked(checked);
  };

  return (
    <>
      <ReserveBox>
        <a className={styles.ReservePolicyLink} href={policyURL} target="_blank" rel="noreferrer">
          {'약관 보기 >'}
        </a>
        <ReserveBoxTitle className={styles.ReservePolicyTitle}>
          <div className={styles.ReservePolicyTitleContent}>
            개인정보 수집, 이용 동의
            {/* TODO: 모달창으로 변경 */}
          </div>
          <input type="checkbox" onChange={handleChange} className={styles.ReservePolicyCheckBox} />
        </ReserveBoxTitle>
      </ReserveBox>
      <ReservePolicyDetail isOpen={isPolicyOpen} />
    </>
  );
};

export default ReservePolicy;
