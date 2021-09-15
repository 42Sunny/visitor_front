import { CardContent } from 'components/Common/Card';
import { CardLine } from 'components/Common/Card';
import { CardTitle } from 'components/Common/Card';
import { CardContainer } from 'components/Common/Card';
import { Card } from 'components/Common/Card';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReserve } from 'tools/apiHandler';
import { formattedPhone } from 'tools/formattedPhone';
import { useHistory } from 'react-router-dom';
import { deleteReserve } from 'tools/apiHandler';
import styles from 'styles/ReserveInfo/ReserveInfo.module.css';
import classNames from 'classnames';
import ReactModal from 'react-modal';

const DeleteModal = ({ isOpen, onRequestClose, onDeleteButtonClick, onCancelButtonClick }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.DeleteModal}
      ariaHideApp={false}
    >
      <div className={styles.DeleteModalBox}>
        <div className={styles.DeleteModalHeader}>
          <div>예약을</div>
          <div>삭제하시겠습니까?</div>
        </div>
        <div className={styles.DeleteModalContent}>
          <button onClick={onDeleteButtonClick} className={styles.DeleteModalDeleteButton}>
            삭제
          </button>
          <button onClick={onCancelButtonClick} className={styles.DeleteModalCancelButton}>
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
      <Card title="방문 정보">
        <CardLine title="날짜" content={date} />
        <CardLine title="장소" content={place} />
        <CardLine title="목적" content={purpose} />
      </Card>
      <CardContainer>
        <CardTitle>{`방문자 정보 (${visitor.length}명)`}</CardTitle>
        {visitor.map((elem) => (
          <CardContent key={`${elem.reserveId}-${elem.phone}`}>
            <CardLine title="조직" content={elem.organization} />
            <CardLine title="이름" content={elem.name} />
            <CardLine title="번호" content={formattedPhone(elem.phone)} />
          </CardContent>
        ))}
      </CardContainer>
      <div className={styles.ButtonBox}>
        <button
          className={classNames(styles.Button, styles.UpdateButton)}
          onClick={() => {
            history.push({
              pathname: '/reserve',
              state: { ...result, isUpdate: true },
            });
          }}
        >
          수정
        </button>
        <button
          className={classNames(styles.Button, styles.DeleteButton)}
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          삭제
        </button>
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
