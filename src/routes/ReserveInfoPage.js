import ReserveInfo from 'components/ReserveInfo/ReserveInfo';
import ReserveInfoContent from 'components/ReserveInfo/ReserveInfoContent';
import ReserveInfoHeader from 'components/ReserveInfo/ReserveInfoHeader';
import React from 'react';

const ReserveInfoPage = () => {
  return (
    <ReserveInfo>
      <ReserveInfoHeader />
      <ReserveInfoContent />
    </ReserveInfo>
  );
};

export default ReserveInfoPage;
