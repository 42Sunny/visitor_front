import { debounce } from 'loadsh';
import { useMemo, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

export type PurposeReturnTypes = {
  purpose: string;
  setPurpose: React.Dispatch<React.SetStateAction<string>>;
  errorPurposeMessage: string;
  setErrorPurposeMessage: React.Dispatch<React.SetStateAction<string>>;
  checkPurpose: (purpose: string) => void;
};

const IDLE_TIME = 500;
const ERROR_BLANK_PURPOSE = '목적을 입력해주세요.';
const ERROR_NONE = '';

const usePurpose = (initialPurpose: string): PurposeReturnTypes => {
  const [purpose, setPurpose] = useState(initialPurpose);
  const [errorPurposeMessage, setErrorPurposeMessage] = useState('');

  const checkPurpose = (purpose: string) => {
    if (purpose === '') setErrorPurposeMessage(ERROR_BLANK_PURPOSE);
    else setErrorPurposeMessage(ERROR_NONE);
  };

  const lazyCheckPurpose = useMemo(
    () =>
      debounce((purpose: string) => {
        checkPurpose(purpose);
      }, IDLE_TIME),
    [],
  );

  useDidMountEffect(() => lazyCheckPurpose(purpose), [purpose]);

  return { purpose, setPurpose, errorPurposeMessage, setErrorPurposeMessage, checkPurpose };
};

export default usePurpose;
