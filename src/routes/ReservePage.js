import ReserveDate from 'components/Reserve/ReserveDate';
import { ReserveHeader } from 'components/Reserve/ReserveHeader';
import ReservePlace from 'components/Reserve/ReservePlace';
import ReserveStaff from 'components/Reserve/ReserveStaff';
import ReservePurpose from 'components/Reserve/ReservePurpose';
import React, { useContext, useEffect } from 'react';
import styles from 'styles/ReservePage.module.css';
import ReserveVisitor from 'components/Reserve/ReserveVisitor';
import ReservePolicy from 'components/Reserve/ReservePolicy';
import ReserveSubmit from 'components/Reserve/ReserveSubmit';
import { useLocation } from 'react-router-dom';
import { ReserveContext } from 'contexts/ReserveContext';
import Page from 'components/Common/Page';

const ReserveContent = () => {
  return (
    <div className={styles.ReserveContent}>
      <ReservePlace />
      <ReserveDate />
      <ReserveStaff />
      <ReserveVisitor />
      <ReservePurpose />
      <ReservePolicy />
      <ReserveSubmit />
    </div>
  );
};

const ReserveBackground = () => {
  return <div className={styles.ReserveBackground} />;
};

const ReservePage = () => {
  const location = useLocation();
  const { setDate, setPlace, setPurpose, setTargetStaffName, setVisitor } =
    useContext(ReserveContext);

  useEffect(() => {
    if (location.state) {
      const visitor = location.state.visitor.map((elem) => {
        return {
          ...elem,
          key: Math.random(),
          isChanged: false,
        };
      });
      setDate(new Date(location.state.date));
      setPlace(location.state.place);
      setPurpose(location.state.purpose);
      setTargetStaffName(location.state.staff.name);
      setVisitor(visitor);
    }
  }, [location.state, setDate, setPlace, setPurpose, setTargetStaffName, setVisitor]);

  return (
    <Page>
      <ReserveHeader />
      <ReserveContent />
      <ReserveBackground />
    </Page>
  );
};

export default ReservePage;
