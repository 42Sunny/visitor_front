import Button from 'components/Common/Button';
import useTitle from 'hooks/useTitle';
import React from 'react';
import { useHistory } from 'react-router';
import classes from 'assets/styles/Error/ErrorPage.module.css';

const TITLE_TEXT = '에러 - IA Visitor';
const ERROR_TEXT = '잘못된 경로입니다. 같은 에러가 반복된다면 관리자에게 요청하세요.';

const ErrorPage = () => {
  const history = useHistory();
  useTitle(TITLE_TEXT);

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className={classes.box}>
      <div>{ERROR_TEXT}</div>
      <Button onClick={handleClick}>홈으로 이동</Button>
    </div>
  );
};

export default ErrorPage;
