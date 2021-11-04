import React, { useCallback } from 'react';
import VisitorForm from './VisitorForm';

const VisitorFormBox = ({ visitors, setVisitors }) => {
  const deleteVisitor = useCallback(
    (targetId) => {
      setVisitors(visitors.filter((visitor) => visitor.id !== targetId));
    },
    [setVisitors, visitors],
  );

  const saveVisitors = useCallback(() => {
    setVisitors([...visitors]);
  }, [setVisitors, visitors]);

  const VisitorFormProps = {
    setVisitors,
    numberOfVisitors: visitors.length,
    saveVisitors,
    deleteVisitor,
  };

  return visitors.map((visitor) => (
    <VisitorForm key={visitor.key} visitor={visitor} {...VisitorFormProps} />
  ));
};

export default React.memo(VisitorFormBox);
