import { ReserveContext } from 'contexts/ReserveContext';
import { useContext } from 'react';
import ReactModal from 'react-modal';
import { useHistory, useLocation } from 'react-router';
import classes from 'assets/styles/Reserve/ReserveResult.module.css';

const ReserveResult = ({ isOpen, reserveId }) => {
  const { visitor, place } = useContext(ReserveContext);
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    if (reserveId !== undefined)
      history.push({ pathname: `/reserve-info/${reserveId}`, state: { isSubmit: true } });
    else {
      if (location.state) {
        const {
          state: { visitor },
        } = location;
        const reserveId = visitor[0].reserveId;
        history.push({ pathname: `/reserve-info/${reserveId}`, state: { isSubmit: true } });
      } else history.push('/');
    }
  };

  return (
    <ReactModal isOpen={isOpen} className={classes.ModalBox} ariaHideApp={false}>
      <div className={classes.Content}>
        <div>{`${visitor[0].name}님 ${place}클러스터`}</div>
        <div>{location.state ? `방문 수정이 완료되었습니다.` : `방문 신청이 완료되었습니다.`}</div>
        <button className={classes.CheckButton} onClick={handleClick}>
          확인
        </button>
      </div>
    </ReactModal>
  );
};

export default ReserveResult;
