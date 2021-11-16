import { useState } from 'react';

export type PlaceReturnTypes = {
  place: string;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  errorPlaceMessage: string;
  setErrorPlaceMessage: React.Dispatch<React.SetStateAction<string>>;
};

const usePlace = (initialPlace: string): PlaceReturnTypes => {
  const [place, setPlace] = useState(initialPlace);
  const [errorPlaceMessage, setErrorPlaceMessage] = useState('');

  return { place, setPlace, errorPlaceMessage, setErrorPlaceMessage };
};

export default usePlace;
