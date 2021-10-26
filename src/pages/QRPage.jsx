import React from 'react';
import useTitle from 'hooks/useTitle';
import QRContainer from 'components/QR/QRContainer';
import CovidCheck from 'components/QR/CovidCheck';

const QR_TITLE = 'QR 체크인 - IA Visitor';

const QRPage = () => {
  useTitle(QR_TITLE);

  return (
    <CovidCheck>
      <QRContainer />
    </CovidCheck>
  );
};

export default QRPage;
