import { ReserveContext } from 'contexts/ReserveContext';
import React, { useCallback, useContext } from 'react';
import RepresentationForm from './RepresentationForm';
import VisitorForm from './VisitorForm';

type PropTypes = {
  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
};

const VisitorFormBox = ({ visitors, setVisitors }: PropTypes) => {
  const { representative } = useContext(ReserveContext);
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
      {visitors.map((visitor, index) =>
        representative === false ? (
          <VisitorForm key={visitor.key} visitor={visitor} {...VisitorFormProps} index={index} />
        ) : (
          <RepresentationForm
            key={visitor.key}
            visitor={visitor}
            {...VisitorFormProps}
            index={index}
          />
        ),
      )}
    </>
  );
};

export default React.memo(VisitorFormBox);
