import React, { useContext } from 'react';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { ReserveContext } from 'contexts/ReserveContext';

const RepresentationCheck = () => {
  const { representative, setRepresentative } = useContext(ReserveContext);

  const handleChange = () => {
    setRepresentative(!representative);
  };

  return (
    <div className={classes.RepresentationCheck}>
      <div>
        <h6>대표자만 번호 입력하기</h6>
      </div>
      <div>
        <input type="checkbox" checked={representative} onChange={handleChange} />
      </div>
    </div>
  );
};

export default RepresentationCheck;
