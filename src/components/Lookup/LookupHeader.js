import React from 'react';
import styles from 'styles/LookupPage.module.css';
import logoImg from 'images/logo_42_small.png';
// import menuImg from 'images/icon_menu.svg';
import { useHistory } from 'react-router-dom';

const LookupHeader = () => {
  return (
    <div className={styles.LookupHeader}>
      <LookupLogo />
      <LookupHeaderTitle />
      <LookupMenu />
    </div>
  );
};

const LookupLogo = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.LookupLogo}>
      <img src={logoImg} alt="logo" className={styles.LookupLogoImg} onClick={handleClick} />
    </div>
  );
};
const LookupHeaderTitle = () => {
  return <div className={styles.LookupHeaderTitle}>방문 예약</div>;
};
const LookupMenu = () => {
  return (
    <div className={styles.LookupMenu}>
      {/* <img src={menuImg} alt="menu" className={styles.LookupMenuImg} /> */}
    </div>
  );
};

export { LookupHeader };
