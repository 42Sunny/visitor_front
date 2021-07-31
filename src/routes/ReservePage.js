import ReserveDate from 'components/Reserve/ReserveDate';
import { ReserveHeader } from 'components/Reserve/ReserveHeader';
import ReservePlace from 'components/Reserve/ReservePlace';
import ReserveStaff from 'components/Reserve/ReserveStaff';
import ReservePurpose from 'components/Reserve/ReservePurpose';
import React from 'react';
import styles from 'styles/ReservePage.module.css';
import ReserveVisitor from 'components/Reserve/ReserveVisitor';
import ReservePolicy from 'components/Reserve/ReservePolicy';
import ReserveSubmit from 'components/Reserve/ReserveSubmit';
import { ReserveProvider } from 'contexts/ReserveContext';

const ReserveContent = () => {
  return (
    <div className={styles.ReserveContent}>
      <ReserveProvider>
        <ReservePlace />
        <ReserveDate />
        <ReserveStaff />
        <ReserveVisitor />
        <ReservePurpose />
        <ReservePolicy />
        <ReserveSubmit />
      </ReserveProvider>
    </div>
  );
};

const Reserve = ({ children }) => {
  return <div className={styles.Reserve}>{children}</div>;
};

const ReserveBackground = () => {
  return <div className={styles.ReserveBackground} />;
};

const ReservePage = () => {
  return (
    <Reserve>
      <ReserveHeader />
      <ReserveContent />
      <ReserveBackground />
    </Reserve>
  );
};

export default ReservePage;
