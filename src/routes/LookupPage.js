import React from 'react';
import styles from 'styles/LookupPage.module.css';
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
  return (
    <Lookup>
      <LookupContent />
      <LookupBackground />
    </Lookup>
  );
};

export default LookupPage;
