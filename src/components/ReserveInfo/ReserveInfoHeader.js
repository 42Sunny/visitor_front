import React from 'react';
import styles from 'styles/ReserveInfo/ReserveInfoHeader.module.css';
import logoImg from 'images/logo_42_small.png';
import { useHistory } from 'react-router-dom';

const ReserveInfoHeader = () => {
  return (
    <div className={styles.Header}>
      <ReserveInfoLogo />
      <ReserveInfoHeaderTitle />
      <ReserveInfoMenu />
    </div>
  );
};

const ReserveInfoLogo = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.Logo}>
      <img src={logoImg} alt="logo" className={styles.LogoImg} onClick={handleClick} />
    </div>
  );
};
const ReserveInfoHeaderTitle = () => {
  return <div className={styles.HeaderTitle}>예약 정보</div>;
};

const ReserveInfoMenu = () => {
  return <div className={styles.Menu}></div>;
};

export default ReserveInfoHeader;
