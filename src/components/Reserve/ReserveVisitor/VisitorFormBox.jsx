import { ReserveContext } from 'contexts/ReserveContext';
import { useContext } from 'react';
import VisitorForm from './VisitorForm';

const VisitorFormBox = () => {
  const { visitor } = useContext(ReserveContext);
  return visitor.map((elem) => <VisitorForm key={elem.key} vis={elem} />);
};

export default VisitorFormBox;
