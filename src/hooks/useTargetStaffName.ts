import { debounce } from 'loadsh';
import { useMemo, useState } from 'react';
import { checkStaff } from 'tools/API';
import useDidMountEffect from './useDidMountEffect';

export type TargetStaffNameReturnTypes = {
  targetStaffName: string;
  setTargetStaffName: React.Dispatch<React.SetStateAction<string>>;
  errorTargetStaffNameMessage: string;
  setErrorTargetStaffNameMessage: React.Dispatch<React.SetStateAction<string>>;
  checkTargetStaffName: (targetStaffName: string) => void;
};

const IDLE_TIME = 500;
const ERROR_BLANK_TARGET_STAFF_NAME = '이름을 입력해주세요.';
const ERROR_INVALID_TARGET_STAFF_NAME = '등록되지 않은 직원입니다.';
const ERROR_NONE = '';

const useTargetStaffName = (initialTargetStaffName: string): TargetStaffNameReturnTypes => {
  const [targetStaffName, setTargetStaffName] = useState(initialTargetStaffName);
  const [errorTargetStaffNameMessage, setErrorTargetStaffNameMessage] = useState('');

  const checkTargetStaffName = (targetStaffName: string) => {
    if (targetStaffName === '') setErrorTargetStaffNameMessage(ERROR_BLANK_TARGET_STAFF_NAME);
    else {
      checkStaff(targetStaffName).then((res) => {
        const { data } = res;
        if (data.hasOwnProperty('error')) {
          setErrorTargetStaffNameMessage(ERROR_INVALID_TARGET_STAFF_NAME);
        } else {
          setErrorTargetStaffNameMessage(ERROR_NONE);
        }
      });
    }
  };

  const lazyCheckTargetStaffName = useMemo(
    () =>
      debounce((targetStaffName: string) => {
        checkTargetStaffName(targetStaffName);
      }, IDLE_TIME),
    [],
  );

  useDidMountEffect(() => {
    lazyCheckTargetStaffName(targetStaffName);
  }, [targetStaffName]);

  return {
    targetStaffName,
    setTargetStaffName,
    errorTargetStaffNameMessage,
    setErrorTargetStaffNameMessage,
    checkTargetStaffName,
  };
};

export default useTargetStaffName;
