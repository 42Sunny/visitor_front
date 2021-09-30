import ReserveInfoContent from 'components/ReserveInfo/ReserveInfoContent';
import React, { useEffect } from 'react';

const ReserveInfoPage = () => {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = '상세 정보 - IA Visitor';
  }, []);

  return <ReserveInfoContent />;
};

export default ReserveInfoPage;
