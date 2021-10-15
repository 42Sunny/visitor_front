import ReserveDate from 'components/Reserve/ReserveDate';
import ReservePlace from 'components/Reserve/ReservePlace';
import ReserveStaff from 'components/Reserve/ReserveStaff';
import ReservePurpose from 'components/Reserve/ReservePurpose';
import React, { useContext, useEffect } from 'react';
import styles from 'assets/styles/ReservePage.module.css';
import ReserveVisitor from 'components/Reserve/ReserveVisitor';
import ReservePolicy from 'components/Reserve/ReservePolicy';
import ReserveSubmit from 'components/Reserve/ReserveSubmit';
import { useLocation } from 'react-router-dom';
import { ReserveContext } from 'contexts/ReserveContext';

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
    const htmlTitle = document.querySelector('title');
    if (!location.state) htmlTitle.innerHTML = '방문 예약 - IA Visitor';
    else htmlTitle.innerHTML = '예약 수정- IA Visitor';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.state) {
      const visitor = location.state.visitor.map((elem) => {
        const key = Math.random();
        return {
          ...elem,
          key,
          isChanged: false,
          isEditable: false,
          id: key,
        };
      });
      const newDate = new Date(location.state.date.replace(/-/g, '/'));
      setDate(newDate);
      setPlace(location.state.place);
      setPurpose(location.state.purpose);
      setTargetStaffName(location.state.staff.name);
      setVisitor(visitor);
    }
  }, [location.state, setDate, setPlace, setPurpose, setTargetStaffName, setVisitor]);

  return (
    <>
      <ReserveContent />
      <ReserveBackground />
    </>
  );
};

export default ReservePage;
