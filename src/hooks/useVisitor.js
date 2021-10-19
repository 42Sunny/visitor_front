import { debounce } from 'loadsh';
import { useCallback, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 500;
const ERROR_BLANK_VISITOR = '방문자를 추가해주세요.';
const ERROR_NOT_FULL_VISITOR = '방문 정보를 모두 입력해야합니다.';
const ERROR_DUPLICATE_PHONE_NUM = '휴대폰 번호는 중복될 수 없습니다.';
const ERROR_NONE = '';

// autoSave가 true면 모든 내용이 꽉차면 자동 저장된다.
// autoSave는 한번 발동하면 false로 변경된다.

const isDuplicatePhone = (visitor, setVisitor) => {
  const checker = {};
  visitor.forEach((elem) => {
    if (checker[elem.phone]) {
      return true;
    } else {
      checker[elem.phone] = true;
    }
  });
  return false;
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
  const checkVisitor = (visitor) => {
    if (!visitor || visitor.length === 0) setErrorMessage(ERROR_BLANK_VISITOR);
    else if (isDuplicatePhone(visitor, setVisitor) === true)
      setErrorMessage(ERROR_DUPLICATE_PHONE_NUM);
    else if (isFullVisitor(visitor) !== true) setErrorMessage(ERROR_NOT_FULL_VISITOR);
    else setErrorMessage(ERROR_NONE);
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
        elem.autoSave = false;
        setVisitor([...visitor]);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckVisitor = useCallback(
    debounce((visitor) => {
      checkVisitor(visitor);
      autoSave(visitor);
    }, IDLE_TIME),
    [checkVisitor],
  );

  useDidMountEffect(() => lazyCheckVisitor(visitor), [visitor]);

  return [visitor, setVisitor, errorMessage, setErrorMessage];
};

export default useVisitor;
