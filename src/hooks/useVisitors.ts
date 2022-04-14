import { useState, useCallback } from 'react';
import useDidMountEffect from './useDidMountEffect';

export type VisitorReturnTypes = {
  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
  errorVisitorsMessage: string;
  setErrorVisitorsMessage: React.Dispatch<React.SetStateAction<string>>;
  checkVisitors: (visitors: Visitor[]) => void;
  representative: boolean;
  setRepresentative: React.Dispatch<React.SetStateAction<boolean>>;
};

const ERROR_BLANK_VISITOR = '방문자를 추가해주세요.';
const ERROR_NOT_FULL_VISITOR = '방문 정보를 모두 입력해야합니다.';
const ERROR_DUPLICATE_PHONE_NUM = '휴대폰 번호는 중복될 수 없습니다.';
const ERROR_NONE = '';
const PHONE_REG_EXP = /^01\d{9}$/; // 휴대폰 번호 유효성 검사 정규표현식
const EMPTY_PHONE_NUM = '00000000000';

type Checker = {
  [index: string]: boolean;
};

const isDuplicatePhone = (visitors: Visitor[]) => {
  const checker: Checker = {};
  return visitors.some((elem) => {
    const converted = convertPhone(elem.phone);
    if (elem.phone === EMPTY_PHONE_NUM) return false;
    if (checker[converted] === true) {
      return true;
    } else {
      checker[converted] = true;
      return false;
    }
  });
};

const isFullVisitor = (visitors: Visitor[]) => {
  return visitors.every(
    (elem) => elem.name !== '' && elem.phone !== '' && elem.organization !== '',
  );
};

export const convertPhone = (rawPhone: string) => {
  const rawPhoneArray = rawPhone.split('');
  return rawPhoneArray.filter((ch) => ch !== '-').join('');
};

const useVisitor = (initialVisitor: Visitor): VisitorReturnTypes => {
  const [visitors, setVisitors] = useState([initialVisitor]);
  const [errorVisitorsMessage, setErrorVisitorsMessage] = useState('');
  const [representative, setRepresentative] = useState(false);

  const checkVisitors = useCallback((visitors: Visitor[]) => {
    if (!visitors || visitors.length === 0) setErrorVisitorsMessage(ERROR_BLANK_VISITOR);
    else if (isFullVisitor(visitors) !== true) setErrorVisitorsMessage(ERROR_NOT_FULL_VISITOR);
    else if (isDuplicatePhone(visitors) === true) {
      setErrorVisitorsMessage(ERROR_DUPLICATE_PHONE_NUM);
    } else {
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
        PHONE_REG_EXP.exec(convertPhone(elem.phone)) !== null
      ) {
        elem.isEditable = false;
        elem.isChanged = true;
        elem.autoSave = false;
        elem.phone = convertPhone(elem.phone);
        setVisitors([...visitors]);
      }
    });
  };

  useDidMountEffect(() => {
    checkVisitors(visitors);
    if (representative)
      visitors.forEach((visitor, idx) => {
        if (idx !== 0) visitor.phone = EMPTY_PHONE_NUM;
      });
  }, [visitors]);

  useDidMountEffect(() => {
    setVisitors((visitors) => {
      if (representative) {
        visitors.forEach((visitor, idx) => {
          if (idx !== 0) visitor.phone = EMPTY_PHONE_NUM;
        });
      } else {
        visitors.forEach((visitor, idx) => {
          if (idx !== 0 && visitor.phone === EMPTY_PHONE_NUM) visitor.phone = '';
        });
      }
      return [...visitors];
    });
  }, [representative]);

  return {
    visitors,
    setVisitors,
    errorVisitorsMessage,
    setErrorVisitorsMessage,
    checkVisitors,
    representative,
    setRepresentative,
  };
};

export default useVisitor;
