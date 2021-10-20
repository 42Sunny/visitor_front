import { useEffect, useRef } from 'react';

/*
렌더링되고 첫 실행을 방지하는 hook
*/
const useDidMountEffect = (func: Function, deps: [any]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidMountEffect;
