import BigTitle from 'components/Common/BigTitle';
import { ReserveContext } from 'contexts/ReserveContext';
import { useContext } from 'react';
import ReserveStar from '../ReserveStar';

const NumberOfVisitorMessage = (visitors) =>
  `총 ${visitors.filter((elem) => elem.isEditable === false).length}명`;

const VisitorHeader = (props) => {
  const { visitors } = useContext(ReserveContext);

  return (
    <div className={props.className}>
      <BigTitle>
        방문자 정보 <ReserveStar />
      </BigTitle>
      <div>{NumberOfVisitorMessage(visitors)}</div>
    </div>
  );
};

export default VisitorHeader;
