import React, { useCallback } from 'react';
import VisitorForm from './VisitorForm';

const VisitorFormBox = ({ visitors, setVisitors }) => {
  const deleteVisitor = useCallback(
    (targetId) => {
      if (visitors.length !== 1) {
        setVisitors((visitors) => visitors.filter((visitor) => visitor.id !== targetId));
      }
    },
    [setVisitors, visitors.length],
  );

  const saveVisitor = useCallback(() => {
    setVisitors((visitors) => [...visitors]);
  }, [setVisitors]);

  const VisitorFormProps = {
    saveVisitor,
    deleteVisitor,
  };

  return visitors.map((visitor) => (
    <VisitorForm key={visitor.key} visitor={visitor} {...VisitorFormProps} />
  ));
};

export default React.memo(VisitorFormBox);
