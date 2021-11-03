import React, { useContext } from 'react';
import { LookupContext } from 'contexts/LookupContext';

import LookupResults from './LookupResults';
import LookupNoResult from './LookupNoResult';

const LookupResultContainer = () => {
  const { reserves } = useContext(LookupContext);

  return (
    <>
      {reserves !== null &&
        (reserves.length === 0 ? <LookupNoResult /> : <LookupResults reserves={reserves} />)}
    </>
  );
};

export default LookupResultContainer;
