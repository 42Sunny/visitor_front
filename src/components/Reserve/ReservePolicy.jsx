import React, { useContext, useEffect, useState } from 'react';
import classes from 'assets/styles/Reserve/ReservePolicy.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReservePolicyModal from './ReservePolicyModal';
import ReserveStar from './ReserveStar';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';

const ReservePolicy = () => {
  const { isPolicyChecked, setIsPolicyChecked } = useContext(ReserveContext);
  // eslint-disable-next-line no-unused-vars
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handlePolicyChange = (event) => {
    const {
      target: { checked },
    } = event;
    setIsPolicyChecked(checked);
  };

  const handleButtonClick = () => {
    setIsPolicyChecked(!isPolicyChecked);
  };

  const handlePolicyDetailClick = () => {
    setIsPolicyOpen(true);
  };

  const handlePolicyClose = () => {
    setIsPolicyOpen(false);
  };

  const handlePolicyButtonClick = () => {
    setIsPolicyOpen(false);
    setIsPolicyChecked(true);
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
            checked={isPolicyChecked}
            onChange={handlePolicyChange}
            className={classes.CheckBox}
          />
        </button>
        <div className={classes.Link} onClick={handlePolicyDetailClick}>
          {'약관 보기'}
        </div>
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
