import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext } from 'react';
import makeVisitor from 'tools/makeVisitor';

const VisitorAddButton = (props) => {
  const { visitor, setVisitor } = useContext(ReserveContext);

  const handleClick = () => {
    const newVisitor = makeVisitor();
    const newVisitors = [...visitor, newVisitor];
    setVisitor(newVisitors);
  };

  return (
    <button className={props.className} onClick={handleClick}>
      + 방문자 추가
    </button>
  );
};

export default VisitorAddButton;
