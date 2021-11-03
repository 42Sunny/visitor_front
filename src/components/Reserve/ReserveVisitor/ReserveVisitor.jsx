import React, { useContext } from 'react';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReserveError from '../ReserveError';
import WhiteBox from 'components/Common/WhiteBox';
import VisitorHeader from './VisitorHeader';
import VisitorFormBox from './VisitorFormBox';
import VisitorAddButton from './VisitorAddButton';

const ReserveVisitor = () => {
  const { visitors, setVisitors, errorVisitorMessage } = useContext(ReserveContext);

  return (
    <WhiteBox isGrid>
      <VisitorHeader visitors={visitors} className={classes.Header} />
      <VisitorFormBox visitors={visitors} setVisitors={setVisitors} />
      <VisitorAddButton
        className={classes.AddButton}
        visitors={visitors}
        setVisitors={setVisitors}
      />
      <ReserveError>{errorVisitorMessage}</ReserveError>
    </WhiteBox>
  );
};

export default ReserveVisitor;
