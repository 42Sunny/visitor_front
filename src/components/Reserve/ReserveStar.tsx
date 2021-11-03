import React from 'react';
import styles from 'assets/styles/ReservePage.module.css';

const ReserveStar = () => {
  return <span className={styles.ReserveStar}>*</span>;
};

export default React.memo(ReserveStar);
