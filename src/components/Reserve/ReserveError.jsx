import React from 'react';
import styles from 'assets/styles/ReservePage.module.css';

const ReserveError = ({ children }) => {
  return <div className={styles.ReserveError}>{children}</div>;
};

export default React.memo(ReserveError);
