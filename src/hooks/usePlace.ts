import { useState, useMemo } from 'react';

export type PlaceReturnTypes = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

const usePlace = (initialPlace: string): PlaceReturnTypes => {
  const [place, setPlace] = useState(initialPlace);
  const [errorMessage, setErrorMessage] = useState('');

  const value = useMemo(() => ({ place, setPlace }), [place]);

  return [value.place, value.setPlace, errorMessage, setErrorMessage];
};

export default usePlace;
