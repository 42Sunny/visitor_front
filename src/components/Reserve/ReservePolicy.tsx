import React, { useContext, useEffect, useState, useCallback } from 'react';
import classes from 'assets/styles/Reserve/ReservePolicy.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReservePolicyModal from './ReservePolicyModal';
import WhiteBox from 'components/Common/WhiteBox';
import ReserveBigTitle from './ReserveBigTitle';

type PropTypes = {
  isPolicyOpen: boolean;
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onPolicyClose: any;
  onPolicyChange: React.ChangeEventHandler<HTMLInputElement>;
  isPolicyChecked: boolean;
  onPolicyDetailClick: React.MouseEventHandler<HTMLDivElement>;
  onPolicyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

const TITLE_POLICY = `개인정보 수집, 이용 동의 `;

const VReservePolicy = React.memo(
  ({
    isPolicyOpen,
    onButtonClick,
    onPolicyClose,
    onPolicyChange,
    isPolicyChecked,
    onPolicyDetailClick,
    onPolicyButtonClick,
  }: PropTypes) => (
    <>
      <WhiteBox>
        <button onClick={onButtonClick} className={classes.CheckButton}>
          <ReserveBigTitle title={TITLE_POLICY} />
          <input
            type="checkbox"
            checked={isPolicyChecked}
            onChange={onPolicyChange}
            className={classes.CheckBox}
          />
        </button>
        <div className={classes.Link} onClick={onPolicyDetailClick}>
          {'약관 보기'}
        </div>
      </WhiteBox>
      <ReservePolicyModal
        isOpen={isPolicyOpen}
        onRequestClose={onPolicyClose}
        onButtonClick={onPolicyButtonClick}
      />
    </>
  ),
);

const ReservePolicy = () => {
  const { isPolicyChecked, setIsPolicyChecked } = useContext(ReserveContext);
  // eslint-disable-next-line no-unused-vars
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const handlePreventScroll = useCallback((open) => {
    const body = window.document.querySelector('body');
    const html = window.document.querySelector('html');
    if (open === true) {
      body?.classList.add('BlockScroll');
      html?.classList.add('BlockScroll');
    } else {
      body?.classList.remove('BlockScroll');
      html?.classList.remove('BlockScroll');
    }
  }, []);

  useEffect(() => {
    handlePreventScroll(isPolicyOpen);
  }, [handlePreventScroll, isPolicyOpen]);

  const ReservePolicyProps = {
    isPolicyOpen,
    isPolicyChecked,

    onButtonClick: useCallback(() => {
      setIsPolicyChecked((checked) => !checked);
    }, [setIsPolicyChecked]),

    onPolicyClose: useCallback(() => {
      setIsPolicyOpen(false);
    }, []),

    onPolicyChange: useCallback(
      (event) => {
        const {
          target: { checked },
        } = event;
        setIsPolicyChecked(checked);
      },
      [setIsPolicyChecked],
    ),

    onPolicyDetailClick: useCallback(() => {
      setIsPolicyOpen(true);
    }, []),

    onPolicyButtonClick: useCallback(() => {
      setIsPolicyOpen(false);
      setIsPolicyChecked(true);
    }, [setIsPolicyChecked]),
  };

  return <VReservePolicy {...ReservePolicyProps} />;
};

export default ReservePolicy;
