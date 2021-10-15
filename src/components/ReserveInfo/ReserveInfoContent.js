import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReserve } from 'tools/apiHandler';
import { formattedPhone } from 'tools/formattedPhone';
import { useHistory, useLocation } from 'react-router-dom';
import { deleteReserve } from 'tools/apiHandler';
import classes from 'assets/styles/ReserveInfo/ReserveInfo.module.css';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import SmallTitle from 'components/Common/SmallTitle';

const DeleteModal = ({ isOpen, onRequestClose, onDeleteButtonClick, onCancelButtonClick }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={classes.DeleteModal}
      ariaHideApp={false}
    >
      <div className={classes.DeleteModalBox}>
        <div className={classes.DeleteModalHeader}>
          <div>예약을</div>
          <div>삭제하시겠습니까?</div>
        </div>
        <div className={classes.DeleteModalContent}>
          <button onClick={onDeleteButtonClick} className={classes.DeleteModalDeleteButton}>
            삭제
          </button>
          <button onClick={onCancelButtonClick} className={classes.DeleteModalCancelButton}>
            취소
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

const getReserveInfo = async (id) => {
  const {
    data: { error, date, place, purpose, staff, visitor },
  } = await getReserve(id);
  if (!error) {
    return { date, place, purpose, staff, visitor };
  } else {
    return null;
  }
};

const ReserveInfoContent = () => {
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [place, setPlace] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [visitor, setVisitor] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!isNaN(id)) {
      getReserveInfo(id)
        .then((res) => {
          const { date, place, purpose, visitor } = res;
          setDate(date);
          setPlace(place);
          setPurpose(purpose);
          setVisitor(visitor);
          setIsLoading(true);
          setResult(res);
        })
        .catch((error) => {
          //TODO: error 서버에 보내기
        });
    }
  }, [id]);

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    deleteReserve(id).then((res) => {
      history.push({
        pathname: '/',
      });
    });
  };

  return isLoading ? (
    <>
      <div className={classes.Container}>
        <div>
          <BigTitle className={classes.Title}>방문 정보</BigTitle>
          <WhiteBox isGrid>
            <div className={classes.Line}>
              <SmallTitle>날짜</SmallTitle>
              <div className={classes.Value}>{date}</div>
            </div>
            <div className={classes.Line}>
              <SmallTitle>장소</SmallTitle>
              <div className={classes.Value}>{place}</div>
            </div>
            <div className={classes.Line}>
              <SmallTitle>목적</SmallTitle>
              <div className={classes.Value}>{purpose}</div>
            </div>
          </WhiteBox>
        </div>
        <div>
          <BigTitle className={classes.Title}>{`방문자 정보 (${visitor.length}명)`}</BigTitle>
          <div className={classes.VisitorBox}>
            {visitor.map((elem) => (
              <WhiteBox isGrid key={`${elem.reserveId}-${elem.phone}`}>
                <div className={classes.Line}>
                  <SmallTitle>조직</SmallTitle>
                  <div className={classes.Value}>{elem.organization}</div>
                </div>
                <div className={classes.Line}>
                  <SmallTitle>이름</SmallTitle>
                  <div className={classes.Value}>{elem.name}</div>
                </div>
                <div className={classes.Line}>
                  <SmallTitle>번호</SmallTitle>
                  <div className={classes.Value}>{formattedPhone(elem.phone)}</div>
                </div>
              </WhiteBox>
            ))}
          </div>
        </div>
        {location.state && (
          <div className={classes.ButtonBox}>
            <button
              className={classNames(classes.Button, classes.DeleteButton)}
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              삭제
            </button>
            <button
              className={classNames(classes.Button, classes.UpdateButton)}
              onClick={() => {
                history.push({
                  pathname: '/reserve',
                  state: { ...result, isUpdate: true },
                });
              }}
            >
              수정
            </button>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleModalClose}
        onCancelButtonClick={handleModalClose}
        onDeleteButtonClick={handleDelete}
      />
    </>
  ) : (
    <div>유효하지 않은 접근입니다.</div>
  );
};

export default ReserveInfoContent;
