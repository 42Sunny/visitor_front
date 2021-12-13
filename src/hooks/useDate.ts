import { debounce } from 'loadsh';
import { useMemo, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 200;
const ERROR_BLANK_DATE = '날짜 및 시간을 선택해주세요.';
const ERROR_INVALID_TIME = '예약이 불가능한 시간입니다.';
const ERROR_INVALID_DATE = '현재 시간보다 빠른 시간으로는 예약이 불가능합니다.';
const ERROR_NONE = '';

export type DateReturnTypes = {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  errorDateMessage: string;
  setErrorDateMessage: React.Dispatch<React.SetStateAction<string>>;
  checkDate: (date: Date) => void;
};

const useDate = (initialDate: Date | null): DateReturnTypes => {
  const [date, setDate] = useState(initialDate);
  const [errorDateMessage, setErrorDateMessage] = useState('');

  const checkDate = (date: Date) => {
    if (date === null) setErrorDateMessage(ERROR_BLANK_DATE);
    else if (date.getHours() === 0 && date.getMinutes() === 0)
      setErrorDateMessage(ERROR_INVALID_TIME);
    else if (compareNow(date) < 0) setErrorDateMessage(ERROR_INVALID_DATE);
    else setErrorDateMessage(ERROR_NONE);
  };

  const lazyCheckDate = useMemo(() => debounce((date: Date) => checkDate(date), IDLE_TIME), []);

  useDidMountEffect(() => lazyCheckDate(date), [date]);

  return { date, setDate, errorDateMessage, setErrorDateMessage, checkDate };
};

/*
인자인 date와 현재 시간의 년도, 월, 일만 비교하여
인자가 과거라면 양수를 반환한다.
인자가 현재라면 0을 반환한다.
인자가 미래라면 음수을 반환한다.
*/
export const compareNow = (date: Date) => {
  const temp = new Date(date);
  const now = new Date();

  temp.setHours(0);
  temp.setMinutes(0);
  temp.setSeconds(0);
  temp.setMilliseconds(0);
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return temp.getTime() - now.getTime();
};

export default useDate;
