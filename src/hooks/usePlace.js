import { useState } from 'react';

const usePlace = (initialPlace) => {
  const [place, setPlace] = useState(initialPlace);
  const [errorMessage, setErrorMessage] = useState('');

  return [place, setPlace, errorMessage, setErrorMessage];
};

export default usePlace;
