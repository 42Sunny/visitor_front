import React, { useContext } from 'react';
import styles from 'styles/ReservePage.module.css';
import logoImg from 'images/logo_42_small.png';
// import menuImg from 'images/icon_menu.svg';
import { useHistory } from 'react-router-dom';
import { ReserveContext } from 'contexts/ReserveContext';

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
  const { isUpdate } = useContext(ReserveContext);

  if (!isUpdate) return <div className={styles.ReserveHeaderTitle}>방문 예약</div>;
  else return <div className={styles.ReserveHeaderTitle}>예약 수정</div>;
};
const ReserveMenu = () => {
  return (
    <div className={styles.ReserveMenu}>
      {/* <img src={menuImg} alt="menu" className={styles.ReserveMenuImg} /> */}
    </div>
  );
};

export { ReserveHeader };
