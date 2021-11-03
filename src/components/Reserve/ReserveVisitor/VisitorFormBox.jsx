import React from 'react';
import VisitorForm from './VisitorForm';

const VisitorFormBox = ({ visitors, setVisitors }) => {
  return visitors.map((visitor) => (
    <VisitorForm
      key={visitor.key}
      visitor={visitor}
      visitors={visitors}
      setVisitors={setVisitors}
    />
  ));
};

export default React.memo(VisitorFormBox);
