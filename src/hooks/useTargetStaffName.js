import { debounce } from 'loadsh';
import { useCallback, useState } from 'react';
import { checkStaff } from 'tools/apiHandler';
import useDidMountEffect from './useDidMountEffect';

const IDLE_TIME = 500;
const ERROR_BLANK_TARGET_STAFF_NAME = '이름을 입력해주세요.';
const ERROR_INVALID_TARGET_STAFF_NAME = '등록되지 않은 직원입니다.';
const ERROR_NONE = '';

const useTargetStaffName = (initialTargetStaffName) => {
  const [targetStaffName, setTargetStaffName] = useState(initialTargetStaffName);
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkTargetStaffName = (targetStaffName) => {
    if (targetStaffName === '') setErrorMessage(ERROR_BLANK_TARGET_STAFF_NAME);
    else {
      checkStaff(targetStaffName).then((res) => {
        const { data } = res;
        if (data.hasOwnProperty('error')) {
          setErrorMessage(ERROR_INVALID_TARGET_STAFF_NAME);
        } else {
          setErrorMessage(ERROR_NONE);
        }
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckTargetStaffName = useCallback(
    debounce((targetStaffName) => {
      checkTargetStaffName(targetStaffName);
    }, IDLE_TIME),
    [],
  );

  useDidMountEffect(() => {
    lazyCheckTargetStaffName(targetStaffName);
  }, [targetStaffName]);

  return [targetStaffName, setTargetStaffName, errorMessage, setErrorMessage];
};

export default useTargetStaffName;
