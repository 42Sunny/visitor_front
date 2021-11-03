import React from 'react';
import makeVisitor from 'tools/makeVisitor';

const VISITOR_ADD_BUTTON_TEXT = '+ 방문자 추가';

const VisitorAddButton = ({ className, visitors, setVisitors }) => {
  const handleClick = () => {
    const newVisitor = makeVisitor();
    const newVisitors = [...visitors, newVisitor];
    setVisitors(newVisitors);
  };

  return (
    <button className={className} onClick={handleClick}>
      {VISITOR_ADD_BUTTON_TEXT}
    </button>
  );
};

export default React.memo(VisitorAddButton);
