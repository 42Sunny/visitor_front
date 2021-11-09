import React from 'react';
import styles from 'assets/styles/LookupPage.module.css';
import LookupInput from 'components/Lookup/LookupInput';
import LookupResultContainer from 'components/Lookup/LookupResultContainer';
import { LookupProvider } from 'contexts/LookupContext';
import useTitle from 'hooks/useTitle';

type PropTypes = {
  children: React.ReactNode;
};

const LookupBackground = () => {
  return <div className={styles.LookupBackground} />;
};

const LookupContent = () => {
  return (
    <div className={styles.LookupContent}>
      <LookupProvider>
        <LookupInput />
        <LookupResultContainer />
      </LookupProvider>
    </div>
  );
};

const Lookup = ({ children }: PropTypes) => {
  return <div className={styles.Lookup}>{children}</div>;
};

const LookupPage = () => {
  useTitle('예약 조회 - IA Visitor');

  return (
    <Lookup>
      <LookupContent />
      <LookupBackground />
    </Lookup>
  );
};

export default LookupPage;
