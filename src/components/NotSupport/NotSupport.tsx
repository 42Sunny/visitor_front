import WhiteBox from 'components/Common/WhiteBox';
import React, { useEffect } from 'react';
import { sendError } from 'tools/API';
import classes from 'assets/styles/NotSupport/NotSupport.module.css';

const NotSupport = () => {
  useEffect(() => {
    const time = setTimeout(
      () => sendError({ code: 200 }, { message: '지원하지 않는 브라우저' }),
      3000,
    );
    return () => clearTimeout(time);
  }, []);

  return (
    <WhiteBox className={classes.Container}>
      <div>죄송합니다. 현재 지원하지 않는 브라우저입니다.</div>
      <br />
      <div>해당 브라우저에 대한 지원은 추후에 개선될 예정입니다.</div>
      <br />
      <div>현재는 크롬 혹은 다른 브라우저를 사용해주세요.</div>
      <br />
      <div>계속해서 문제가 발생한다면 데스크에 문의해주세요.</div>
    </WhiteBox>
  );
};

export default NotSupport;
