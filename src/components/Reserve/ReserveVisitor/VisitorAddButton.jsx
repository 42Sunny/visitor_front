import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import makeVisitor from 'tools/makeVisitor';

const VisitorAddButton = (props) => {
  const { visitors, setVisitors } = useContext(ReserveContext);

  const handleClick = () => {
    const newVisitor = makeVisitor();
    const newVisitors = [...visitors, newVisitor];
    setVisitors(newVisitors);
  };

  return (
    <button className={props.className} onClick={handleClick}>
      + 방문자 추가
    </button>
  );
};

export default VisitorAddButton;
