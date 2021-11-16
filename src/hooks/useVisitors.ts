import { debounce } from 'loadsh';
import { useMemo, useState, useCallback } from 'react';
import useDidMountEffect from './useDidMountEffect';

export type VisitorReturnTypes = {
  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
  errorVisitorsMessage: string;
  setErrorVisitorsMessage: React.Dispatch<React.SetStateAction<string>>;
  checkVisitors: (visitors: Visitor[]) => void;
};

const IDLE_TIME = 200;
const ERROR_BLANK_VISITOR = '방문자를 추가해주세요.';
const ERROR_NOT_FULL_VISITOR = '방문 정보를 모두 입력해야합니다.';
const ERROR_DUPLICATE_PHONE_NUM = '휴대폰 번호는 중복될 수 없습니다.';
const ERROR_NONE = '';

type checker = {
  [index: string]: boolean;
};

// TODO: 번호가 비어있을 경우 중복 처리 하지 않음
const isDuplicatePhone = (visitors: Visitor[]) => {
  const checker: checker = {};
  return visitors.some((elem) => {
    if (checker[elem.phone] === true) {
      return true;
    } else {
      checker[elem.phone] = true;
      return false;
    }
  });
};

const isFullVisitor = (visitors: Visitor[]) => {
  return visitors.every(
    (elem) => elem.name !== '' && elem.phone !== '' && elem.organization !== '',
  );
};

const useVisitor = (initialVisitor: Visitor): VisitorReturnTypes => {
  const [visitors, setVisitors] = useState([initialVisitor]);
  const [errorVisitorsMessage, setErrorVisitorsMessage] = useState('');

  const checkVisitors = useCallback((visitors: Visitor[]) => {
    if (!visitors || visitors.length === 0) setErrorVisitorsMessage(ERROR_BLANK_VISITOR);
    else if (isDuplicatePhone(visitors) === true) {
      setErrorVisitorsMessage(ERROR_DUPLICATE_PHONE_NUM);
    } else if (isFullVisitor(visitors) !== true) setErrorVisitorsMessage(ERROR_NOT_FULL_VISITOR);
    else {
      autoSave(visitors);
      setErrorVisitorsMessage(ERROR_NONE);
    }
  }, []);

  const autoSave = (visitors: Visitor[]) => {
    visitors.forEach((elem) => {
      if (
        elem.autoSave &&
        elem.name !== '' &&
        elem.organization !== '' &&
        elem.phone.length >= 11
      ) {
        elem.isEditable = false;
        elem.isChanged = true;
        elem.autoSave = false;
        setVisitors([...visitors]);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckError = useMemo(
    () =>
      debounce((visitors: Visitor[]) => {
        checkVisitors(visitors);
      }, IDLE_TIME),
    [checkVisitors],
  );

  useDidMountEffect(() => lazyCheckError(visitors), [visitors]);

  return {
    visitors,
    setVisitors,
    errorVisitorsMessage,
    setErrorVisitorsMessage,
    checkVisitors,
  };
};

export default useVisitor;
