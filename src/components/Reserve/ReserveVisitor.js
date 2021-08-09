import React, { useContext, useEffect, useState } from 'react';
import { ReserveBox, ReserveBoxTitle, ReserveInputBox } from './Reserve';
import styles from 'styles/ReservePage.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import makeVisitor from 'tools/makeVisitor';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import { useLocation } from 'react-router-dom';

const ReserveVisitorBox = ({ vis }) => {
  const { visitor, setVisitor } = useContext(ReserveContext);
  const [tmpName, setTmpName] = useState(vis.name);
  const [tmpOrganization, setTmpOrganization] = useState(vis.organization);
  const [tmpPhone, setTmpPhone] = useState(vis.phone);
  const location = useLocation();

  const handleSave = () => {
    if (tmpPhone !== '' && tmpOrganization !== '' && tmpPhone !== '') {
      const newVisitor = [...visitor];
      newVisitor.forEach((v) => {
        if (v.id === vis.id) {
          v.isEditable = false;
          v.organization = tmpOrganization;
          v.name = tmpName;
          v.phone = tmpPhone;
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
      console.log(!isNaN(data));
      if (isNaN(data) === false) {
        vis.phone = value;
        setTmpPhone(value);
      }
    }
  };

  useEffect(() => {
    if (tmpName !== '' && tmpOrganization !== '' && tmpPhone.length === 11) handleSave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tmpPhone]);

  return (
    <ReserveInputBox className={styles.ReserveVisitorBox}>
      <div>
        <form>
          <div className={styles.ReserveVisitorInfoBox}>
            <div className={styles.ReserveVisitorInfoTitle}>
              {`소속 `}
              <ReserveStar />
            </div>
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
            <div className={styles.ReserveVisitorInfoTitle}>
              {`성함 `}
              <ReserveStar />
            </div>
            <div className={styles.ReserveVisitorInfoValue}>
              {vis.isEditable === true ? (
                <input
                  className={styles.ReserveVisitorInput}
                  placeholder="성함을 입력해주세요"
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
            <div className={styles.ReserveVisitorInfoTitle}>
              {`연락처 `}
              <ReserveStar />
            </div>
            <div className={styles.ReserveVisitorInfoValue}>
              {vis.isEditable === true ? (
                <input
                  className={styles.ReserveVisitorInput}
                  placeholder="연락처를 입력해주세요"
                  value={tmpPhone}
                  onChange={handleChange}
                  name="phone"
                  type="tel"
                />
              ) : (
                vis.phone
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
    </ReserveInputBox>
  );
};

const makeReserveVisitorBox = (visitors) => {
  return visitors.map((visitor) => <ReserveVisitorBox key={visitor.key} vis={visitor} />);
};

const ReserveVisitorButton = () => {
  const { visitor, setVisitor } = useContext(ReserveContext);

  const handleClick = () => {
    const newVisitor = makeVisitor();
    const newVisitors = [...visitor, newVisitor];
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
    <ReserveBoxTitle className={styles.ReserveVisitorBoxTitle}>
      <div>
        방문자 정보 <ReserveStar />
      </div>
      <div className={styles.ReserveVistiorNumber}>총 {visitors.length}명</div>
    </ReserveBoxTitle>
  );
};

const ReserveVisitor = () => {
  const { visitor, visitorError } = useContext(ReserveContext);

  return (
    <>
      <ReserveBox>
        <ReserveVisitorBoxTitle visitors={visitor} />
        {makeReserveVisitorBox(visitor)}
        <ReserveVisitorButton />
        {visitorError && <ReserveError>모든 정보를 입력해야합니다.</ReserveError>}
      </ReserveBox>
    </>
  );
};

export default ReserveVisitor;
