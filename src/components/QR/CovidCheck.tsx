import React, { useState, useEffect } from 'react';
import classes from 'assets/styles/QR/CovidCheck.module.css';
import Spacing from 'components/Common/Spacing';
import QRCode from './QRCode';
import QRMessage from './QRMessage';
import classNames from 'classnames';

const TEMP_CONTENT = '발열 체크시 37.5도 이하인 것을 확인했습니다.';
const MASK_CONTENT = '마스크를 반드시 상시 착용하고 방역수칙을 준수할 것을 약속합니다.';
const ALL_CONTENT = '모두 동의합니다.';

const CovidCheck = () => {
  const [allCheck, setAllCheck] = useState(false);
  const [maskCheck, setMaskCheck] = useState(false);
  const [tempCheck, setTempCheck] = useState(false);
  const [check, setCheck] = useState(0);

  const handleTempClick = () => {
    if (check !== 2) setTempCheck(!tempCheck);
  };

  const handleMaskClick = () => {
    if (check !== 2) setMaskCheck(!maskCheck);
  };

  const handleAllClick = () => {
    setAllCheck(!allCheck);
    if (check !== 2) {
      setTempCheck(!allCheck);
      setMaskCheck(!allCheck);
    }
  };

  useEffect(() => {
    let num = maskCheck === true ? 1 : 0;
    num += tempCheck === true ? 1 : 0;
    setAllCheck(num === 2);
    setCheck(num);
  }, [maskCheck, tempCheck]);

  return (
    <div className={classes.Container}>
      <QRCode
        className={check === 0 ? classes.FullBlur : check === 1 ? classes.HalfBlur : undefined}
      />
      <QRMessage isChecked={check === 2} />
      <Spacing one />
      <div className={classes.Box} onClick={handleAllClick}>
        <input
          type="checkbox"
          className={classes.CheckBox}
          checked={allCheck}
          onChange={handleAllClick}
          disabled={check === 2}
        />
        <div className={classNames(classes.Content, classes.Bold)}>{ALL_CONTENT}</div>
      </div>
      <div className={classes.Box} onClick={handleMaskClick}>
        <input
          type="checkbox"
          className={classes.CheckBox}
          checked={maskCheck}
          onChange={handleMaskClick}
          disabled={check === 2}
        />
        <div className={classes.Content}>{MASK_CONTENT}</div>
      </div>
      <div className={classes.Box} onClick={handleTempClick}>
        <input
          type="checkbox"
          className={classes.CheckBox}
          checked={tempCheck}
          onChange={handleTempClick}
          disabled={check === 2}
        />
        <div className={classes.Content}>{TEMP_CONTENT}</div>
      </div>
      <Spacing two />
    </div>
  );
};

export default CovidCheck;
