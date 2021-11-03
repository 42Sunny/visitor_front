import React from 'react';
import ReserveBigTitle from '../ReserveBigTitle';

const VISITOR_TITLE = '방문자 정보';

const NumberOfVisitorMessage = (visitors) =>
  `총 ${visitors.filter((elem) => elem.isEditable === false).length}명`;

const VisitorHeader = ({ visitors, className }) => {
  return (
    <div className={className}>
      <ReserveBigTitle title={VISITOR_TITLE} />
      <div>{NumberOfVisitorMessage(visitors)}</div>
    </div>
  );
};

export default React.memo(VisitorHeader);
