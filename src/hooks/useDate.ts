import { debounce } from 'loadsh';
import { useMemo, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 200;
const ERROR_BLANK_DATE = '시간을 선택해주세요.';
const ERROR_INVALID_DATE = '현재 시간보다 빠른 시간으로는 예약이 불가능합니다.';
const ERROR_NONE = '';

export type DateReturnTypes = [
  Date,
  React.Dispatch<React.SetStateAction<Date>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

const useDate = (initialDate: Date): DateReturnTypes => {
  const [date, setDate] = useState(initialDate);
  const [errorMessage, setErrorMessage] = useState('');

  const checkDate = (date: Date) => {
    if (date === null) setErrorMessage(ERROR_BLANK_DATE);
    else if (date < new Date()) setErrorMessage(ERROR_INVALID_DATE);
    else setErrorMessage(ERROR_NONE);
  };

  const lazyCheckDate = useMemo(() => debounce((date: Date) => checkDate(date), IDLE_TIME), []);

  useDidMountEffect(() => lazyCheckDate(date), [date]);

  return [date, setDate, errorMessage, setErrorMessage];
};

export default useDate;
