import React, { useCallback } from 'react';
import VisitorForm from './VisitorForm';

type PropTypes = {
  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
};

const VisitorFormBox = ({ visitors, setVisitors }: PropTypes) => {
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

  return (
    <>
      {visitors.map((visitor, index) => (
        <VisitorForm key={visitor.key} visitor={visitor} {...VisitorFormProps} index={index} />
      ))}
    </>
  );
};

export default React.memo(VisitorFormBox);
