import React from 'react';
import styles from 'styles/ReservePage.module.css';
import logoImg from 'images/logo_42_small.png';
// import menuImg from 'images/icon_menu.svg';
import { useHistory } from 'react-router-dom';

const ReserveHeader = () => {
  return (
    <div className={styles.ReserveHeader}>
      <ReserveLogo />
      <ReserveHeaderTitle />
      <ReserveMenu />
    </div>
  );
};

const ReserveLogo = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={styles.ReserveLogo}>
      <img src={logoImg} alt="logo" className={styles.ReserveLogoImg} onClick={handleClick} />
    </div>
  );
};
const ReserveHeaderTitle = () => {
  return <div className={styles.ReserveHeaderTitle}>방문 예약</div>;
};
const ReserveMenu = () => {
  return (
    <div className={styles.ReserveMenu}>
      {/* <img src={menuImg} alt="menu" className={styles.ReserveMenuImg} /> */}
    </div>
  );
};

export { ReserveHeader };
