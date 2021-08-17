import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReserve } from 'tools/apiHandler';

const getReserveInfo = async (id) => {
  const {
    data: { error, date, place, purpose, staff, visitor },
  } = await getReserve(id);
  if (!error) {
    return { date, place, purpose, staff, visitor };
  } else {
    return null;
  }
};

const ReserveInfoContent = () => {
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [place, setPlace] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [staff, setStaff] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReserveInfo(id)
      .then(({ date, place, purpose, staff, visitor }) => {
        setDate(date);
        setPlace(place);
        setPurpose(purpose);
        setStaff(staff);
        setVisitor(visitor);
        setIsLoading(true);
      })
      .catch((error) => {
        //TODO: error 서버에 보내기
      });
  }, [id]);

  return isLoading ? (
    <>
      <h3>방문 정보</h3>
      <div>날짜 : {date}</div>
      <div>장소 : {place}</div>
      <div>목적 : {purpose}</div>
      <br />
      <h3>직원 정보</h3>
      <div>이름 : {staff.name}</div>
      <div>번호 : {staff.phone}</div>
      <br />
      <h3>방문자 정보 {`(${visitor.length}명)`}</h3>
      <div>
        {visitor.map((elem) => (
          <React.Fragment key={`${elem.reserveId}-${elem.phone}`}>
            <div>조직 : {elem.organization}</div>
            <div>이름 : {elem.name}</div>
            <div>번호 : {elem.phone}</div>
            <br />
          </React.Fragment>
        ))}
      </div>{' '}
    </>
  ) : (
    <div>Loading</div>
  );
};

export default ReserveInfoContent;
