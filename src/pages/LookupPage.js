import React, { useEffect } from 'react';
import styles from 'assets/styles/LookupPage.module.css';
import LookupInput from 'components/Lookup/LookupInput';
import LookupResult from 'components/Lookup/LookupResult';
import { LookupProvider } from 'contexts/LookupContext';

const LookupBackground = () => {
  return <div className={styles.LookupBackground} />;
};

const LookupContent = () => {
  return (
    <div className={styles.LookupContent}>
      <LookupProvider>
        <LookupInput />
        <LookupResult />
      </LookupProvider>
    </div>
  );
};

const Lookup = ({ children }) => {
  return <div className={styles.Lookup}>{children}</div>;
};

const LookupPage = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = '예약 조회 - IA Visitor';
  }, []);

  return (
    <Lookup>
      <LookupContent />
      <LookupBackground />
    </Lookup>
  );
};

export default LookupPage;
