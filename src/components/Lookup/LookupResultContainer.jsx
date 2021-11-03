import React, { useContext, useRef, useEffect } from 'react';
import { LookupContext } from 'contexts/LookupContext';
import LookupResults from './LookupResults';
import LookupNoResult from './LookupNoResult';

const LookupResultContainer = () => {
  const { reserves } = useContext(LookupContext);
  const firstEnter = useRef(true);

  // 첫 진입 시에는 결과값을 숨기기 위함.
  useEffect(() => {
    firstEnter.current = false;
  }, []);

  return (
    <>
      {!firstEnter.current &&
        (reserves.length === 0 ? <LookupNoResult /> : <LookupResults reserves={reserves} />)}
    </>
  );
};

export default LookupResultContainer;
