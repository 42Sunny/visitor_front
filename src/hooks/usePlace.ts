import { useState, useCallback } from 'react';

export type PlaceReturnTypes = {
  place: string;
  setPlace: React.Dispatch<React.SetStateAction<string>>;
  errorPlaceMessage: string;
  setErrorPlaceMessage: React.Dispatch<React.SetStateAction<string>>;
  handleClickPlace: React.Dispatch<React.SetStateAction<string>>;
};

const usePlace = (initialPlace: string): PlaceReturnTypes => {
  const [place, setPlace] = useState(initialPlace);
  const [errorPlaceMessage, setErrorPlaceMessage] = useState('');

  const handleClickPlace = useCallback(
    (event) => {
      const {
        target: { value, innerText },
      } = event;
      if (value) setPlace(value);
      else setPlace(innerText);
    },
    [setPlace],
  );

  return { place, setPlace, errorPlaceMessage, setErrorPlaceMessage, handleClickPlace };
};

export default usePlace;
