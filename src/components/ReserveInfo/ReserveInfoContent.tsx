import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getReserve } from 'tools/API';
import { formattedPhone } from 'tools/formattedPhone';
import { useHistory, useLocation } from 'react-router-dom';
import { deleteReserve } from 'tools/API';
import classes from 'assets/styles/ReserveInfo/ReserveInfo.module.css';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import SmallTitle from 'components/Common/SmallTitle';
import { EMPTY_PHONE_NUM } from 'hooks/useVisitors';

type ParamsType = {
  reserveId: string;
};

type ResultTypes = {
  date?: string;
  place?: string;
  purpose?: string;
  visitor?: Visitor[];
};

const LOADING_RESERVE_ID_MESSAGE = '서버에서 데이터를 받아오고 있습니다.';

const ReserveInfoContent = () => {
  const { reserveId } = useParams<ParamsType>();
  const history = useHistory();
  const location = useLocation();
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [purpose, setPurpose] = useState('');
  const [visitor, setVisitor] = useState<Visitor[]>([]);
  const [result, setResult] = useState<ResultTypes>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadReserve = useCallback(async () => {
    if (!isNaN(parseInt(reserveId, 10))) {
      const result = await getReserve(reserveId);
      if (result?.data.error === undefined) {
        const {
          data: { date, place, purpose, visitor },
          data,
        } = result;
        if (date) setDate(date);
        if (place) setPlace(place);
        if (purpose) setPurpose(purpose);
        if (visitor) setVisitor(visitor);
        if (data) setResult(data);
        setIsLoading(true);
      } else {
        history.push('/error');
      }
    }
  }, [history, reserveId]);

  useEffect(() => {
    loadReserve();
  }, [loadReserve]);

  const handleModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteReserve(reserveId);
    history.push({
      pathname: '/',
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
                {elem.phone !== EMPTY_PHONE_NUM && (
                  <div className={classes.Line}>
                    <SmallTitle>번호</SmallTitle>
                    <div className={classes.Value}>{formattedPhone(elem.phone)}</div>
                  </div>
                )}
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
                  state: { ...result },
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
    <div>{LOADING_RESERVE_ID_MESSAGE}</div>
  );
};

type DeleteModelPropTypes = {
  isOpen: boolean;
  onRequestClose: any;
  onDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onCancelButtonClick: React.MouseEventHandler<HTMLButtonElement>;
};

const DeleteModal = ({
  isOpen,
  onRequestClose,
  onDeleteButtonClick,
  onCancelButtonClick,
}: DeleteModelPropTypes) => {
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

export default ReserveInfoContent;
