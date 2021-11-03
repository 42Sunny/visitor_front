import BigTitle from 'components/Common/BigTitle';
import React from 'react';
import ReserveStar from './ReserveStar';

type PropTypes = {
  title: string;
  isEssential: boolean;
};

const ReserveBigTitle = ({ title, isEssential = true }: PropTypes) => {
  return (
    <BigTitle>
      {title} {isEssential && <ReserveStar />}
    </BigTitle>
  );
};

export default React.memo(ReserveBigTitle);
