import React, { useContext, useState } from 'react';
import { ReserveBox, ReserveBoxTitle } from './Reserve';
import styles from 'styles/ReservePage.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReservePolicyDetail from './ReservePolicyDetail';
import ReserveStar from './ReserveStar';

const policyURL = 'https://www.privacy.go.kr/gud/pis/perRule.do';

const ReservePolicy = () => {
  const { isChecked, setIsChecked } = useContext(ReserveContext);
  // eslint-disable-next-line no-unused-vars
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handlePolicyChange = (event) => {
    const {
      target: { checked },
    } = event;
    setIsChecked(checked);
  };

  const handleButtonClick = () => {
    setIsChecked(!isChecked);
  };

  const handleURLClick = (event) => {
    event.preventDefault();
    setIsPolicyOpen(true);
  };

  const handlePolicyClose = (event) => {
    setIsPolicyOpen(false);
  };

  return (
    <>
      <ReserveBox>
        <ReserveBoxTitle className={styles.ReservePolicyTitle}>
          <a
            className={styles.ReservePolicyLink}
            href={policyURL}
            target="_blank"
            rel="noreferrer"
            onClick={handleURLClick}
          >
            {'약관 보기 >'}
          </a>
          <button onClick={handleButtonClick} className={styles.ReservePolicyCheckButton}>
            <div className={styles.ReservePolicyTitleContent}>
              {`개인정보 수집, 이용 동의 `}
              <ReserveStar />
              {/* TODO: 모달창으로 변경 */}
            </div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handlePolicyChange}
              className={styles.ReservePolicyCheckBox}
            />
          </button>
        </ReserveBoxTitle>
      </ReserveBox>
      <ReservePolicyDetail isOpen={isPolicyOpen} onRequestClose={handlePolicyClose} />
    </>
  );
};

export default ReservePolicy;
