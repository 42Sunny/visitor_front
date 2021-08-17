import { CardContent } from 'components/Common/Card';
import { CardLine } from 'components/Common/Card';
import { CardTitle } from 'components/Common/Card';
import { CardContainer } from 'components/Common/Card';
import { Card } from 'components/Common/Card';
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
  const [visitor, setVisitor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getReserveInfo(id)
      .then(({ date, place, purpose, staff, visitor }) => {
        setDate(date);
        setPlace(place);
        setPurpose(purpose);
        setVisitor(visitor);
        setIsLoading(true);
      })
      .catch((error) => {
        //TODO: error 서버에 보내기
      });
  }, [id]);

  return isLoading ? (
    <>
      <Card title="방문 정보">
        <CardLine title="날짜" content={date} />
        <CardLine title="장소" content={place} />
        <CardLine title="목적" content={purpose} />
      </Card>
      <CardContainer>
        <CardTitle>{`방문자 정보 (${visitor.length}명)`}</CardTitle>
        {visitor.map((elem) => (
          <CardContent key={`${elem.reserveId}-${elem.phone}`}>
            <CardLine title="조직" content={elem.organization} />
            <CardLine title="이름" content={elem.name} />
            <CardLine title="번호" content={elem.phone} />
          </CardContent>
        ))}
      </CardContainer>
    </>
  ) : (
    <div>Loading</div>
  );
};

export default ReserveInfoContent;
