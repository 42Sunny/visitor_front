import { debounce } from 'loadsh';
import { useCallback, useEffect, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 500;
const ERROR_BLANK_VISITOR = '방문자를 추가해주세요.';
const ERROR_NOT_FULL_VISITOR = '방문 정보를 모두 입력해야합니다.';
const ERROR_DUPLICATE_PHONE_NUM = '휴대폰 번호는 중복될 수 없습니다.';
const ERROR_NONE = '';

const isDuplicatePhone = (visitor) => {
  const checker = {};
  return visitor.some((elem) => {
    if (checker[elem.phone] === true) {
      return true;
    } else {
      checker[elem.phone] = true;
      return false;
    }
  });
};

const isFullVisitor = (visitor) => {
  return visitor.every(
    (elem) =>
      elem.isEditable === true ||
      (elem.name !== '' && elem.phone !== '' && elem.organization !== ''),
  );
};

const useVisitor = (initialVisitor) => {
  const [visitor, setVisitor] = useState(initialVisitor);
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkError = (visitor) => {
    if (!visitor || visitor.length === 0) setErrorMessage(ERROR_BLANK_VISITOR);
    else if (isDuplicatePhone(visitor) === true) {
      setErrorMessage(ERROR_DUPLICATE_PHONE_NUM);
    } else if (isFullVisitor(visitor) !== true) setErrorMessage(ERROR_NOT_FULL_VISITOR);
    else {
      autoSave(visitor);
      setErrorMessage(ERROR_NONE);
    }
  };

  const autoSave = (visitor) => {
    visitor.forEach((elem) => {
      if (
        elem.autoSave &&
        elem.name !== '' &&
        elem.organization !== '' &&
        elem.phone.length >= 11
      ) {
        elem.isEditable = false;
        elem.isChanged = true;
        elem.autoSave = false;
        setVisitor([...visitor]);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckError = useCallback(
    debounce((visitor) => {
      checkError(visitor);
    }, IDLE_TIME),
    [checkError],
  );

  useDidMountEffect(() => lazyCheckError(visitor), [visitor]);

  return [visitor, setVisitor, errorMessage, setErrorMessage];
};

export default useVisitor;
