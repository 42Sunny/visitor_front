import React from 'react';
import classes from 'assets/styles/QR/QRMessage.module.css';
import classNames from 'classnames';

type PropTypes = { isChecked?: boolean };

const QRMessage = ({ isChecked = false }: PropTypes) => {
  if (isChecked) {
    return (
      <div className={classNames(classes.QRMessageBox, { [classes.Grey]: isChecked })}>
        <div className={classes.QRMessage}>입장을 위한 QR코드</div>
        <div className={classes.QRMessageDetail}>이노베이션 아카데미 리더기에</div>
        <div className={classes.QRMessageDetail}>해당 QR코드를 보여주세요.</div>
      </div>
    );
  } else {
    return (
      <div className={classNames(classes.QRMessageBox, { [classes.Red]: !isChecked })}>
        <div className={classes.QRMessage}>입장을 위한 QR코드</div>
        <div className={classes.QRMessageDetail}>아래 동의 항목을 모두 체크하면</div>
        <div className={classes.QRMessageDetail}>입장을 위한 QR코드가 나타납니다.</div>
      </div>
    );
  }
};

export default QRMessage;
