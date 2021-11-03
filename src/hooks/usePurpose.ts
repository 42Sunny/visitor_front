import { debounce } from 'loadsh';
import { useCallback, useState } from 'react';
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lazyCheckPurpose = useCallback(
    debounce((purpose: string) => {
      checkPurpose(purpose);
    }, IDLE_TIME),
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useDidMountEffect(() => lazyCheckPurpose(purpose), [purpose]);

  return [purpose, setPurpose, errorMessage, setErrorMessage];
};

export default usePurpose;
