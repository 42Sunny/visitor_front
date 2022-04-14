import React, { useContext } from 'react';
import { ReserveContext } from 'contexts/ReserveContext';
import ReserveError from '../ReserveError';
import WhiteBox from 'components/Common/WhiteBox';
import VisitorHeader from './VisitorHeader';
import VisitorFormBox from './VisitorFormBox';
import VisitorAddButton from './VisitorAddButton';
import makeVisitor from 'tools/makeVisitor';
import { useCallback } from 'react';
import RepresentationCheck from './RepresentationCheck';

const ReserveVisitor = () => {
  const { visitors, setVisitors, errorVisitorsMessage } = useContext(ReserveContext);

  const visitorHeaderProps = {
    numberOfVisitor: visitors?.length,
  };

  const visitorAddButtonProps = {
    handleClick: useCallback(() => {
      const newVisitor = makeVisitor();
      setVisitors((visitors) => [...visitors, newVisitor]);
    }, [setVisitors]),
  };

  return (
    <WhiteBox isGrid>
      <VisitorHeader {...visitorHeaderProps} />
      <RepresentationCheck />
      <VisitorFormBox visitors={visitors} setVisitors={setVisitors} />
      <VisitorAddButton {...visitorAddButtonProps} />
      <ReserveError>{errorVisitorsMessage}</ReserveError>
    </WhiteBox>
  );
};

export default ReserveVisitor;
