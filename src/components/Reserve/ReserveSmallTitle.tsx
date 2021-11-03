import SmallTitle from 'components/Common/SmallTitle';
import React from 'react';
import ReserveStar from './ReserveStar';

type PropTypes = {
  title: string;
  isEssential: boolean;
};

const ReserveSmallTitle = ({ title, isEssential = true }: PropTypes) => {
  return (
    <SmallTitle>
      {title} {isEssential && <ReserveStar />}
    </SmallTitle>
  );
};

export default React.memo(ReserveSmallTitle);
