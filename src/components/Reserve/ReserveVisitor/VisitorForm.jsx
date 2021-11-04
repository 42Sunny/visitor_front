import classNames from 'classnames';
import GreyBox from 'components/Common/GreyBox';
import React, { useState, useCallback } from 'react';
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

const VisitorForm = ({ visitor, numberOfVisitors, deleteVisitor, saveVisitors }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSave = () => {
    visitor.isEditable = false;
    visitor.isChanged = true;
    visitor.phone = phone;
    visitor.name = name;
    visitor.organization = organization;
    saveVisitors();
  };

  const handleDeleteClick = () => {
    if (numberOfVisitors !== 1) {
      deleteVisitor(visitor.id);
    }
  };

  const handleUpdateClick = () => {
    visitor.isEditable = true;
    saveVisitors();
  };

  const handleChange = useCallback((event) => {
    const {
      target: { value, name },
      nativeEvent: { data },
    } = event;
    if (name === NAME_ORGANIZATION) {
      setOrganization(value);
    } else if (name === NAME_NAME) {
      setName(value);
    } else if (name === NAME_PHONE && isPhoneCharacter(data)) {
      setPhone(value);
    }
  }, []);

  return (
    <GreyBox isGrid>
      <VisitorInput
        title={TITLE_ORGANIZATION}
        placeholder={PH_ORGANIZATION}
        handleChange={handleChange}
        name={NAME_ORGANIZATION}
        value={organization}
        isEditable={visitor.isEditable}
      />
      <VisitorInput
        title={TITLE_NAME}
        placeholder={PH_NAME}
        handleChange={handleChange}
        name={NAME_NAME}
        value={name}
        isEditable={visitor.isEditable}
      />
      <VisitorInput
        title={TITLE_PHONE}
        placeholder={PH_PHONE}
        handleChange={handleChange}
        name={NAME_PHONE}
        value={phone}
        isEditable={visitor.isEditable}
        type="tel"
      />

      <div className={classes.InputButtonBox}>
        <button
          className={classNames(classes.Button, classes.DeleteButton)}
          onClick={handleDeleteClick}
        >
          삭제
        </button>
        {visitor.isEditable === true ? (
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

export default React.memo(VisitorForm);
