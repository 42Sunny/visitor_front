import React, { useState } from 'react';
import classes from 'assets/styles/QR/CovidCheck.module.css';
import Button from 'components/Common/Button';
import Spacing from 'components/Common/Spacing';

const TEMP_CONTENT = '발열 체크시 37.5도 이하인 것을 확인했습니다.';
const MASK_CONTENT = '마스크를 반드시 상시 착용하고 방역수칙을 준수할 것을 약속합니다.';
const BUTTON_CONTENT = '확인';

const CovidCheck = ({ children }) => {
  const [isNext, setIsNext] = useState(false);
  const [maskCheck, setMaskCheck] = useState(false);
  const [tempCheck, setTempCheck] = useState(false);

  const handleTempClick = () => {
    console.log(tempCheck);
    setTempCheck(!tempCheck);
  };

  const handleMaskClick = () => {
    console.log(maskCheck);
    setMaskCheck(!maskCheck);
  };

  const handleNextClick = () => {
    setIsNext(true);
  };

  if (!isNext)
    return (
      <div className={classes.Container}>
        <div className={classes.Box} onClick={handleTempClick}>
          <div className={classes.Content}>{TEMP_CONTENT}</div>
          <input
            type="checkbox"
            className={classes.CheckBox}
            checked={tempCheck}
            onChange={handleTempClick}
          />
        </div>
        <div className={classes.Box} onClick={handleMaskClick}>
          <div className={classes.Content}>{MASK_CONTENT}</div>
          <input
            type="checkbox"
            className={classes.CheckBox}
            checked={maskCheck}
            onChange={handleMaskClick}
          />
        </div>
        <Spacing one />
        <Button
          onClick={handleNextClick}
          className={classes.Button}
          disabled={!(maskCheck && tempCheck)}
        >
          {BUTTON_CONTENT}
        </Button>
      </div>
    );
  else {
    return children;
  }
};

export default CovidCheck;
