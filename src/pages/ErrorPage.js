import React, { useEffect } from 'react';

const ErrorPage = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = '에러 - IA Visitor';
  }, []);

  return <div>Error</div>;
};

export default ErrorPage;
