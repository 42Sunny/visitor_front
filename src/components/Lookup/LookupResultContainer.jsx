import React, { useContext, useRef, useEffect } from 'react';
import { LookupContext } from 'contexts/LookupContext';
import LookupResults from './LookupResults';
import LookupNoResult from './LookupNoResult';

const LookupResultContainer = () => {
  const { reserves } = useContext(LookupContext);
  const firstEnter = useRef(true);

  useEffect(() => {
    firstEnter.current = false;
  });

  return (
    <>
      {!firstEnter.current &&
        (reserves.length === 0 ? <LookupNoResult /> : <LookupResults reserves={reserves} />)}
    </>
  );
};

export default LookupResultContainer;
