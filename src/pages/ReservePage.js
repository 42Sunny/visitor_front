import ReserveDate from 'components/Reserve/ReserveDate';
import ReservePlace from 'components/Reserve/ReservePlace';
import ReserveStaff from 'components/Reserve/ReserveStaff';
import ReservePurpose from 'components/Reserve/ReservePurpose';
import React, { useCallback, useContext, useEffect } from 'react';
import styles from 'assets/styles/ReservePage.module.css';
import ReserveVisitor from 'components/Reserve/ReserveVisitor/ReserveVisitor';
import ReservePolicy from 'components/Reserve/ReservePolicy';
import ReserveSubmit from 'components/Reserve/ReserveSubmit';
import { useLocation } from 'react-router-dom';
import { ReserveContext } from 'contexts/ReserveContext';
import useTitle from 'hooks/useTitle';
import makeVisitor from 'tools/makeVisitor';

const TITLE_RESERVE = '방문 예약 - IA Visitor';
const TITLE_UPDATE = '예약 수정 - IA Visitor';

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

  useTitle(!location.state ? TITLE_RESERVE : TITLE_UPDATE);

  const fillContents = useCallback(() => {
    const visitor = location.state.visitor.map((elem) =>
      makeVisitor(elem.name, elem.organization, elem.phone, false, false),
    );
    /*
      Safari 브라우저에서는 YYYY-MM-DD HH:dd 포맷의 날짜를 new Date의 인자로 사용할 수 없다.
      아래와 같이 변경하여 Safari 브라우저에서도 이용가능하게 변경한다.
    */
    setDate(new Date(location.state.date.replace(/-/g, '/')));
    setPlace(location.state.place);
    setPurpose(location.state.purpose);
    setTargetStaffName(location.state.staff.name);
    setVisitor(visitor);
  }, [location.state, setDate, setPlace, setPurpose, setTargetStaffName, setVisitor]);

  useEffect(() => {
    if (location.state) {
      fillContents();
    }
  }, [fillContents, location.state]);

  return (
    <>
      <ReserveContent />
      <ReserveBackground />
    </>
  );
};

export default ReservePage;
