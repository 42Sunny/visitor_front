import QR from 'components/QR/QR';
import { QRHeader } from 'components/QR/QRHeader';
import React from 'react';
import styles from 'styles/QRPage.module.css';

const QRBox = ({ children }) => {
  return <div className={styles.QRBox}>{children}</div>;
};

const QRMessage = () => {
  return (
    <div className={styles.QRMessageBox}>
      <div className={styles.QRMessage}>입장을 위한 QR코드</div>
      <div className={styles.QRMessageDetail}>입장하려는 시설의 리더기에게</div>
      <div className={styles.QRMessageDetail}>아래 QR코드를 보여주세요.</div>
    </div>
  );
};

const QRPage = () => {
  return (
    <QRBox>
      <QRHeader />
      <div className={styles.QRCodeBox}>
        <QR className={styles.QR} />
      </div>
      {/* <QRButton /> */}
      <QRMessage />
    </QRBox>
  );
};

export default QRPage;
