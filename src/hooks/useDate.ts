import { debounce } from 'loadsh';
import { useMemo, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 200;
const ERROR_BLANK_DATE = '시간을 선택해주세요.';
const ERROR_INVALID_DATE = '현재 시간보다 빠른 시간으로는 예약이 불가능합니다.';
const ERROR_NONE = '';

export type DateReturnTypes = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  errorDateMessage: string;
  setErrorDateMessage: React.Dispatch<React.SetStateAction<string>>;
  checkDate: (date: Date) => void;
};

const useDate = (initialDate: Date): DateReturnTypes => {
  const [date, setDate] = useState(initialDate);
  const [errorDateMessage, setErrorDateMessage] = useState('');

  const checkDate = (date: Date) => {
    if (date === null) setErrorDateMessage(ERROR_BLANK_DATE);
    else if (date < new Date()) setErrorDateMessage(ERROR_INVALID_DATE);
    else setErrorDateMessage(ERROR_NONE);
  };

  const lazyCheckDate = useMemo(() => debounce((date: Date) => checkDate(date), IDLE_TIME), []);

  useDidMountEffect(() => lazyCheckDate(date), [date]);

  return { date, setDate, errorDateMessage, setErrorDateMessage, checkDate };
};

export default useDate;
