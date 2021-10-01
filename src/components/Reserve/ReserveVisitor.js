import React, { useContext, useEffect, useState } from 'react';
import styles from 'styles/ReservePage.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import makeVisitor from 'tools/makeVisitor';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { useLocation } from 'react-router-dom';
import { formattedPhone } from 'tools/formattedPhone';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';
import SmallTitle from 'components/Common/SmallTitle';

const ReserveVisitorBox = ({ vis }) => {
  const { visitor, setVisitor, setDuplicateError } = useContext(ReserveContext);
  const [tmpName, setTmpName] = useState(vis.name);
  const [tmpOrganization, setTmpOrganization] = useState(vis.organization);
  const [tmpPhone, setTmpPhone] = useState(vis.phone);
  const location = useLocation();

  const subtractDash = (phone) => {
    const rawPhone = Array.from(phone);
    const filteredPhone = rawPhone.filter((elem) => isNaN(elem) === false);
    return filteredPhone.join('');
  };

  const handleSave = () => {
    if (tmpName !== '' && tmpOrganization !== '' && tmpPhone !== '') {
      const newVisitor = [...visitor];
      newVisitor.forEach((v) => {
        if (v.id === vis.id) {
          v.isEditable = false;
          v.organization = tmpOrganization;
          v.name = tmpName;
          v.phone = subtractDash(tmpPhone);
          setTmpPhone(v.phone);
        }
      });
      setVisitor(newVisitor);
    }
  };

  const handleDeleteClick = () => {
    if (visitor.length !== 1) {
      const newVisitor = visitor.filter((v) => {
        return v.id !== vis.id;
      });
      setVisitor(newVisitor);
    }
  };

  const handleUpdateClick = () => {
    const check = visitor.filter((vis) => vis.isEditable === true);
    if (check.length === 0) {
      const newVisitor = [...visitor];
      newVisitor.forEach((v) => {
        if (v.id === vis.id) {
          vis.isEditable = true;
          if (location.state) {
            v.isChanged = true;
          }
        }
      });
      setVisitor(newVisitor);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === 'organization') {
      vis.organization = value;
      setTmpOrganization(value);
    } else if (name === 'name') {
      vis.name = value;
      setTmpName(value);
    } else if (name === 'phone') {
      const {
        nativeEvent: { data },
      } = event;
      if (isNaN(data) === false || data === '-') {
        vis.phone = value;
        setTmpPhone(value);
      }
    }
  };

  useEffect(() => {
    let count = 0;
    Array.from(tmpPhone).forEach((elem) => {
      if (isNaN(elem) === false) {
        count++;
      }
    });
    if (tmpName !== '' && tmpOrganization !== '' && count === 11) {
      const check = visitor.filter((elem) => subtractDash(elem.phone) === subtractDash(tmpPhone));
      if (check.length <= 1) {
        handleSave();
        setDuplicateError(false);
      } else {
        setTmpPhone('');
        setDuplicateError(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tmpPhone]);

  return (
    <GreyBox>
      <div>
        <form>
          <div className={styles.ReserveVisitorInfoBox}>
            <SmallTitle>
              {`소속 `}
              <ReserveStar />
            </SmallTitle>
            <div className={styles.ReserveVisitorInfoValue}>
              {vis.isEditable === true ? (
                <input
                  className={styles.ReserveVisitorInput}
                  placeholder="소속을 입력해주세요"
                  defaultValue={tmpOrganization}
                  onChange={handleChange}
                  name="organization"
                />
              ) : (
                vis.organization
              )}
            </div>
          </div>
          <div className={styles.ReserveVisitorInfoBox}>
            <SmallTitle>
              {`이름 `}
              <ReserveStar />
            </SmallTitle>
            <div className={styles.ReserveVisitorInfoValue}>
              {vis.isEditable === true ? (
                <input
                  className={styles.ReserveVisitorInput}
                  placeholder="이름을 입력해주세요"
                  defaultValue={tmpName}
                  onChange={handleChange}
                  name="name"
                />
              ) : (
                vis.name
              )}
            </div>
          </div>
          <div className={styles.ReserveVisitorInfoBox}>
            <SmallTitle>
              {`휴대폰 번호 `}
              <ReserveStar />
            </SmallTitle>
            <div className={styles.ReserveVisitorInfoValue}>
              {vis.isEditable === true ? (
                <input
                  className={styles.ReserveVisitorInput}
                  placeholder="휴대폰 번호를 입력해주세요"
                  value={tmpPhone}
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                />
              ) : (
                formattedPhone(vis.phone)
              )}
            </div>
          </div>
        </form>
      </div>
      <div className={styles.ReserveVisitorInputButtons}>
        {vis.isEditable === true ? (
          <>
            <button className={styles.ReserveVistiorDeleteButton} onClick={handleDeleteClick}>
              삭제
            </button>
            <button className={styles.ReserveVistiorInsertButton} onClick={handleSave}>
              저장
            </button>
          </>
        ) : (
          <>
            <button className={styles.ReserveVistiorDeleteButton} onClick={handleDeleteClick}>
              삭제
            </button>
            <button className={styles.ReserveVistiorUpdateButton} onClick={handleUpdateClick}>
              수정
            </button>
          </>
        )}
      </div>
    </GreyBox>
  );
};

const makeReserveVisitorBox = (visitors) => {
  return visitors.map((visitor) => <ReserveVisitorBox key={visitor.key} vis={visitor} />);
};

const ReserveVisitorButton = () => {
  const { visitor, setVisitor } = useContext(ReserveContext);
  const location = useLocation();

  const handleClick = () => {
    const newVisitor = makeVisitor();
    const newVisitors = [...visitor, newVisitor];
    if (location.state) newVisitor.isChanged = true;
    setVisitor(newVisitors);
  };

  return (
    <button className={styles.ReserveVisitorButton} onClick={handleClick}>
      + 방문자 추가
    </button>
  );
};

const ReserveVisitorBoxTitle = ({ visitors }) => {
  return (
    <BigTitle className={styles.ReserveVisitorBoxTitle}>
      <div>
        방문자 정보 <ReserveStar />
      </div>
      <div className={styles.ReserveVistiorNumber}>총 {visitors.length}명</div>
    </BigTitle>
  );
};

const ReserveVisitor = () => {
  const { visitor, visitorError, duplicateError } = useContext(ReserveContext);

  return (
    <WhiteBox isGrid>
      <ReserveVisitorBoxTitle visitors={visitor} />
      {makeReserveVisitorBox(visitor)}
      <ReserveVisitorButton />
      {visitorError && <ReserveError>모든 정보를 입력해야합니다.</ReserveError>}
      {duplicateError && <ReserveError>연락처는 중복될 수 없습니다.</ReserveError>}
    </WhiteBox>
  );
};

export default ReserveVisitor;
