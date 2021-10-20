import React, { useContext } from 'react';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import ReserveError from '../ReserveError';
// import { formattedPhone } from 'tools/formattedPhone';
import WhiteBox from 'components/Common/WhiteBox';
import VisitorHeader from './VisitorHeader';
import VisitorFormBox from './VisitorFormBox';
import VisitorAddButton from './VisitorAddButton';

const ReserveVisitor = () => {
  const { errorVisitorMessage } = useContext(ReserveContext);

  return (
    <WhiteBox isGrid>
      <VisitorHeader className={classes.Header} />
      <VisitorFormBox />
      <VisitorAddButton className={classes.AddButton} />
      <ReserveError>{errorVisitorMessage}</ReserveError>
    </WhiteBox>
  );
};

export default ReserveVisitor;
