import Page from 'components/Common/Page';
import ReserveInfoContent from 'components/ReserveInfo/ReserveInfoContent';
import ReserveInfoHeader from 'components/ReserveInfo/ReserveInfoHeader';
import React from 'react';

const ReserveInfoPage = () => {
  return (
    <Page>
      <ReserveInfoHeader />
      <ReserveInfoContent />
    </Page>
  );
};

export default ReserveInfoPage;
