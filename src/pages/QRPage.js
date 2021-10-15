import QR from 'components/QR/QR';
import React, { useEffect } from 'react';
import styles from 'assets/styles/QRPage.module.css';

const QRMessage = () => {
  return (
    <div className={styles.QRMessageBox}>
      <div className={styles.QRMessage}>입장을 위한 QR코드</div>
      <div className={styles.QRMessageDetail}>입장하려는 시설의 리더기에게</div>
      <div className={styles.QRMessageDetail}>해당 QR코드를 보여주세요.</div>
    </div>
  );
};

const QRPage = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'QR 체크인 - IA Visitor';
  }, []);

  return (
    <div className={styles.QRContainer}>
      <div className={styles.QRBox}>
        <QR className={styles.QR} />
        <QRMessage />
      </div>
    </div>
  );
};

export default QRPage;
