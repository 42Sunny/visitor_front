import { debounce } from 'loadsh';
import { useCallback, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 200;
const ERROR_BLANK_DATE = '시간을 선택해주세요.';
const ERROR_INVALID_DATE = '현재 시간보다 빠른 시간으로는 예약이 불가능합니다.';
const ERROR_NONE = '';

const useDate = (initialDate: Date) => {
  const [date, setDate] = useState(initialDate);
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkDate = (date: Date) => {
    if (date === null) setErrorMessage(ERROR_BLANK_DATE);
    else if (date < new Date()) setErrorMessage(ERROR_INVALID_DATE);
    else setErrorMessage(ERROR_NONE);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckDate = useCallback(
    debounce((date: Date) => checkDate(date), IDLE_TIME),
    [checkDate],
  );

  useDidMountEffect(() => lazyCheckDate(date), [date]);

  return [date, setDate, errorMessage, setErrorMessage];
};

export default useDate;
