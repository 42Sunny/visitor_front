import { ReserveContext } from 'contexts/ReserveContext';
import { useContext } from 'react';
import VisitorForm from './VisitorForm';

const VisitorFormBox = () => {
  const { visitors } = useContext(ReserveContext);
  return visitors.map((elem) => <VisitorForm key={elem.key} vis={elem} />);
};

export default VisitorFormBox;
