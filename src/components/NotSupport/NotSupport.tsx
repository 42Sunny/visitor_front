import WhiteBox from 'components/Common/WhiteBox';
import React, { useEffect } from 'react';
import { sendError } from 'tools/API';

const NotSupport = () => {
  useEffect(() => {
    sendError({ code: 200 }, { message: '지원하지 않는 브라우저' });
  }, []);

  return (
    <WhiteBox>
      <div>죄송합니다. 현재 지원하지 않는 브라우저입니다.</div>
      <div>다른 브라우저를 사용해주세요.</div>
      <div>계속해서 문제가 발생한다면 데스크에 문의해주세요.</div>
    </WhiteBox>
  );
};

export default NotSupport;
