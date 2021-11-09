import useTitle from 'hooks/useTitle';
import React from 'react';

const TITLE_TEXT = '에러 - IA Visitor';
const ERROR_TEXT = '잘못된 경로입니다.';

const ErrorPage = () => {
  useTitle(TITLE_TEXT);

  return <div>{ERROR_TEXT}</div>;
};

export default ErrorPage;
