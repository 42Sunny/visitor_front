import { debounce } from 'loadsh';
import { useMemo, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

export type PurposeReturnTypes = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

const IDLE_TIME = 500;
const ERROR_BLANK_PURPOSE = '목적을 입력해주세요.';
const ERROR_NONE = '';

const usePurpose = (initialPurpose: string): PurposeReturnTypes => {
  const [purpose, setPurpose] = useState(initialPurpose);
  const [errorMessage, setErrorMessage] = useState('');

  const checkPurpose = (purpose: string) => {
    if (purpose === '') setErrorMessage(ERROR_BLANK_PURPOSE);
    else setErrorMessage(ERROR_NONE);
  };

  const lazyCheckPurpose = useMemo(
    () =>
      debounce((purpose: string) => {
        checkPurpose(purpose);
      }, IDLE_TIME),
    [],
  );

  useDidMountEffect(() => lazyCheckPurpose(purpose), [purpose]);

  return [purpose, setPurpose, errorMessage, setErrorMessage];
};

export default usePurpose;
