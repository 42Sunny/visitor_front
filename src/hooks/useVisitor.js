import { debounce } from 'loadsh';
import { useCallback, useEffect, useState } from 'react';

const IDLE_TIME = 500;
const ERROR_BLANK_VISITOR = '방문자를 추가해주세요.';
// const ERROR_NOT_FULL_VISITOR = '방문 정보를 모두 입력해야합니다.';
// const ERROR_DUPLICATE_PHONE_NUM = '휴대폰 번호는 중복될 수 없습니다.';
const ERROR_NONE = '';

// const subtractDash = (phone) => {
//   const rawPhone = Array.from(phone);
//   const filteredPhone = rawPhone.filter((elem) => isNaN(elem) === false);
//   return filteredPhone.join('');
// };

const useVisitor = (initialVisitor) => {
  const [visitor, setVisitor] = useState(initialVisitor);
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkVisitor = (visitor) => {
    if (visitor === '') setErrorMessage(ERROR_BLANK_VISITOR);
    else setErrorMessage(ERROR_NONE);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckVisitor = useCallback(
    debounce((visitor) => checkVisitor(visitor), IDLE_TIME),
    [checkVisitor],
  );

  useEffect(lazyCheckVisitor, [lazyCheckVisitor, visitor]);

  return [visitor, setVisitor, errorMessage, setErrorMessage];
};

export default useVisitor;
