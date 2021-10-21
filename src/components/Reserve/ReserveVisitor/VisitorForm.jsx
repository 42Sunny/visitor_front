import classNames from 'classnames';
import GreyBox from 'components/Common/GreyBox';
import { ReserveContext } from 'contexts/ReserveContext';
import { useContext } from 'react';
import VisitorInput from './VisitorInput';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';

const NAME_ORGANIZATION = 'organization';
const NAME_NAME = 'name';
const NAME_PHONE = 'phone';

const TITLE_ORGANIZATION = '소속';
const TITLE_NAME = '이름';
const TITLE_PHONE = '휴대폰 번호';

const PH_ORGANIZATION = '소속을 입력해주세요';
const PH_NAME = '이름을 입력해주세요';
const PH_PHONE = '휴대폰 번호을 입력해주세요';

const isPhoneCharacter = (ch) => isNaN(ch) === false || ch === '-';

const VisitorForm = ({ vis }) => {
  const { visitors, setVisitors } = useContext(ReserveContext);

  const handleSave = () => {
    vis.isEditable = false;
    vis.isChanged = true;
    setVisitors([...visitors]);
  };

  const handleDeleteClick = () => {
    if (visitors.length !== 1) {
      const notDeleted = visitors.filter((v) => v.id !== vis.id);
      setVisitors(notDeleted);
    }
  };

  const handleUpdateClick = () => {
    vis.isEditable = true;
    setVisitors([...visitors]);
  };

  const handleChange = (event) => {
    const {
      target: { value, name },
      nativeEvent: { data },
    } = event;
    if (name === NAME_ORGANIZATION) {
      vis.organization = value;
    } else if (name === NAME_NAME) {
      vis.name = value;
    } else if (name === NAME_PHONE && isPhoneCharacter(data)) {
      vis.phone = value;
    }
    setVisitors([...visitors]);
  };

  return (
    <GreyBox isGrid>
      <VisitorInput
        title={TITLE_ORGANIZATION}
        placeholder={PH_ORGANIZATION}
        handleChange={handleChange}
        name={NAME_ORGANIZATION}
        value={vis.organization}
        isEditable={vis.isEditable}
      />
      <VisitorInput
        title={TITLE_NAME}
        placeholder={PH_NAME}
        handleChange={handleChange}
        name={NAME_NAME}
        value={vis.name}
        isEditable={vis.isEditable}
      />
      <VisitorInput
        title={TITLE_PHONE}
        placeholder={PH_PHONE}
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

export default VisitorForm;
