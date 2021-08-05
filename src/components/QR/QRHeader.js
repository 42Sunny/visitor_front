import React from 'react';
import styles from 'styles/QRPage.module.css';
import logoImg from 'images/logo_42_small.png';
// import menuImg from 'images/icon_menu.svg';
import { useHistory } from 'react-router-dom';

const QRHeader = () => {
  return (
    <div className={styles.QRHeader}>
      <QRLogo />
      <QRHeaderTitle />
      <QRMenu />
    </div>
  );
};

const QRLogo = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.QRLogo}>
      <img src={logoImg} alt="logo" className={styles.QRLogoImg} onClick={handleClick} />
    </div>
  );
};
const QRHeaderTitle = () => {
  return <div className={styles.QRHeaderTitle}>QR 체크인</div>;
};
const QRMenu = () => {
  return <div className={styles.QRMenu}></div>;
};

export { QRHeader };
