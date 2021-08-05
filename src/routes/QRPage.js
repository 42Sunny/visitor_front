import QR from 'components/QR/QR';
import { QRHeader } from 'components/QR/QRHeader';
import React from 'react';
import { useHistory } from 'react-router';
import styles from 'styles/QRPage.module.css';

const QRBox = ({ children }) => {
  return <div className={styles.QRBox}>{children}</div>;
};

const QRMessage = () => {
  return (
    <div className={styles.QRMessageBox}>
      <div className={styles.QRMessage}>리더기에 QR코드를 보여주세요.</div>
    </div>
  );
};

const QRButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.QRButtonBox}>
      <button className={styles.QRButton} onClick={handleClick}>
        돌아가기
      </button>
    </div>
  );
};

const QRPage = () => {
  return (
    <QRBox>
      <QRHeader />
      <QRMessage />
      <div className={styles.QRCodeBox}>
        <QR className={styles.QR} />
      </div>
      {/* <QRButton /> */}
    </QRBox>
  );
};

export default QRPage;
