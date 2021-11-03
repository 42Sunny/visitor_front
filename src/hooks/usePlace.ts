import { useState } from 'react';

export type PlaceReturnTypes = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

const usePlace = (initialPlace: string): PlaceReturnTypes => {
  const [place, setPlace] = useState(initialPlace);
  const [errorMessage, setErrorMessage] = useState('');

  return [place, setPlace, errorMessage, setErrorMessage];
};

export default usePlace;
