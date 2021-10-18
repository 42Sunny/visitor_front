import React, { useContext } from 'react';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { ReserveContext } from 'contexts/ReserveContext';
import makeVisitor from 'tools/makeVisitor';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
// import { formattedPhone } from 'tools/formattedPhone';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';
import SmallTitle from 'components/Common/SmallTitle';
import classNames from 'classnames';

const NAME_ORGANIZATION = 'organization';
const NAME_PHONE = 'phone';
const NAME_NAME = 'name';

const VisitorInput = ({ isEditable, handleChange, title, placeholder, name, value }) => {
  return (
    <div className={classes.InputBox}>
      <SmallTitle>
        {title}
        <ReserveStar />
      </SmallTitle>
      <div className={classes.ValueBox}>
        {isEditable === true ? (
          <input
            className={classes.Input}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            name={name}
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
};

const ReserveVisitorBox = ({ vis }) => {
  const { visitor, setVisitor } = useContext(ReserveContext);

  const handleSave = () => {
    vis.isEditable = false;
    setVisitor([...visitor]);
  };

  const handleDeleteClick = () => {
    if (visitor.length !== 1) {
      const newVisitor = visitor.filter((v) => v.id !== vis.id);
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
        }
      });
      setVisitor(newVisitor);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
    } = event;
    if (name === NAME_ORGANIZATION) {
      vis.organization = value;
    } else if (name === NAME_NAME) {
      vis.name = value;
    } else if (name === NAME_PHONE) {
      const {
        nativeEvent: { data },
      } = event;
      if (isNaN(data) === false || data === '-') {
        vis.phone = value;
      }
    }
    setVisitor([...visitor]);
  };

  return (
    <GreyBox isGrid>
      <VisitorInput
        title="소속"
        placeholder="소속을 입력해주세요"
        handleChange={handleChange}
        name={NAME_ORGANIZATION}
        value={vis.organization}
        isEditable={vis.isEditable}
      />
      <VisitorInput
        title="이름"
        placeholder="이름을 입력해주세요"
        handleChange={handleChange}
        name={NAME_NAME}
        value={vis.name}
        isEditable={vis.isEditable}
      />
      <VisitorInput
        title="휴대폰 번호"
        placeholder="휴대폰 번호을 입력해주세요"
        handleChange={handleChange}
        name={NAME_PHONE}
        value={vis.phone}
        isEditable={vis.isEditable}
      />

      <div className={classes.InputButtonBox}>
        <button
          className={classNames(classes.Button, classes.DeleteButton)}
          onClick={handleDeleteClick}
        >
          삭제
        </button>
        {vis.isEditable === true ? (
          <button className={classNames(classes.Button, classes.InsertButton)} onClick={handleSave}>
            저장
          </button>
        ) : (
          <button
            className={classNames(classes.Button, classes.UpdateButton)}
            onClick={handleUpdateClick}
          >
            수정
          </button>
        )}
      </div>
    </GreyBox>
  );
};

const makeReserveVisitorBox = (visitors) => {
  return visitors.map((visitor) => <ReserveVisitorBox key={visitor.key} vis={visitor} />);
};

const AddVisitorButton = () => {
  const { visitor, setVisitor } = useContext(ReserveContext);

  const handleClick = () => {
    const newVisitor = makeVisitor();
    const newVisitors = [...visitor, newVisitor];
    setVisitor(newVisitors);
  };

  return (
    <button className={classes.AddVisitorButton} onClick={handleClick}>
      + 방문자 추가
    </button>
  );
};

const ReserveVisitor = () => {
  const { visitor, errorVisitorMessage } = useContext(ReserveContext);

  return (
    <WhiteBox isGrid>
      <div className={classes.Header}>
        <BigTitle>
          방문자 정보 <ReserveStar />
        </BigTitle>
        <div>총 {visitor.filter((elem) => elem.isEditable === false).length}명</div>
      </div>
      {makeReserveVisitorBox(visitor)}
      <AddVisitorButton />
      <ReserveError>{errorVisitorMessage}</ReserveError>
    </WhiteBox>
  );
};

export default ReserveVisitor;
