import ReserveInfoContent from 'components/ReserveInfo/ReserveInfoContent';
import useTitle from 'hooks/useTitle';
import React, { useEffect } from 'react';

const TITLE_TEXT = '상세 내역 - IA Visitor';

const ReserveInfoPage = () => {
  useTitle(TITLE_TEXT);

  return <ReserveInfoContent />;
};

export default ReserveInfoPage;
