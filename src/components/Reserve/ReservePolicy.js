import React, { useContext, useEffect, useState } from 'react';
import classes from 'styles/Reserve/ReservePolicy.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReservePolicyModal from './ReservePolicyModal';
import ReserveStar from './ReserveStar';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';

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

  const handlePolicyButtonClick = (event) => {
    setIsPolicyOpen(false);
    setIsChecked(true);
  };

  const handleHiddenScroll = (open) => {
    const body = window.document.querySelector('body');
    const html = window.document.querySelector('html');
    if (open === true) {
      body.classList.add('BlockScroll');
      html.classList.add('BlockScroll');
    } else {
      body.classList.remove('BlockScroll');
      html.classList.remove('BlockScroll');
    }
  };

  useEffect(() => {
    handleHiddenScroll(isPolicyOpen);
  }, [isPolicyOpen]);

  return (
    <>
      <WhiteBox>
        <button onClick={handleButtonClick} className={classes.CheckButton}>
          <BigTitle>
            {`개인정보 수집, 이용 동의 `}
            <ReserveStar />
          </BigTitle>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handlePolicyChange}
            className={classes.CheckBox}
          />
        </button>
        <a className={classes.Link} href={policyURL} onClick={handleURLClick}>
          {'약관 보기'}
        </a>
      </WhiteBox>
      <ReservePolicyModal
        isOpen={isPolicyOpen}
        onRequestClose={handlePolicyClose}
        onButtonClick={handlePolicyButtonClick}
      />
    </>
  );
};

export default ReservePolicy;
