import React from 'react';
import classes from 'assets/styles/QR/QRMessage.module.css';

const QRMessage = () => {
  return (
    <div className={classes.QRMessageBox}>
      <div className={classes.QRMessage}>입장을 위한 QR코드</div>
      <div className={classes.QRMessageDetail}>입장하려는 시설의 리더기에게</div>
      <div className={classes.QRMessageDetail}>해당 QR코드를 보여주세요.</div>
    </div>
  );
};

export default QRMessage;
