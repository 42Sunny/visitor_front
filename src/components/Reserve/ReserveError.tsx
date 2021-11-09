import React from 'react';
import styles from 'assets/styles/ReservePage.module.css';

type PropTypes = {
  children: JSX.Element | string;
};

const ReserveError = ({ children }: PropTypes) => {
  return <div className={styles.ReserveError}>{children}</div>;
};

export default React.memo(ReserveError);
