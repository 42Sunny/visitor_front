import classNames from 'classnames';
import GreyBox from 'components/Common/GreyBox';
import React, { useCallback } from 'react';
import VisitorInput from './VisitorInput';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { convertPhone } from 'hooks/useVisitors';
import isNumber from 'tools/isNumber';

const NAME_ORGANIZATION = 'organization';
const NAME_NAME = 'name';
const NAME_PHONE = 'phone';

const TITLE_ORGANIZATION = '소속';
const TITLE_NAME = '이름';
const TITLE_PHONE = '대표자 휴대폰 번호';

const PH_ORGANIZATION = '소속을 입력해주세요';
const PH_NAME = '이름을 입력해주세요';
const PH_PHONE = '대표자 휴대폰 번호을 입력해주세요';

const BUTTON_TEXT_DELETE = '삭제';
const BUTTON_TEXT_SAVE = '저장';
const BUTTON_TEXT_UPDATE = '수정';

type PropTypes = {
  visitor: Visitor;
  deleteVisitor: (visitorId: string) => void;
  saveVisitor: () => void;
  index: number;
};

const isValidPhoneCharacter = (ch?: string) =>
  ch === null || ch === undefined ? true : isPhoneCharacter(ch);
const isPhoneCharacter = (ch: string) => ch === '-' || isNumber(ch);

const RepresentationForm = ({ visitor, deleteVisitor, saveVisitor, index }: PropTypes) => {
  const handleSave = () => {
    visitor.isEditable = false;
    visitor.isChanged = true;
    visitor.phone = convertPhone(visitor.phone);
    saveVisitor();
  };

  const handleDeleteClick = () => {
    deleteVisitor(visitor.id);
  };

  const handleUpdateClick = () => {
    visitor.isEditable = true;
    saveVisitor();
  };

  const handleChange = useCallback(
    (event) => {
      const {
        target: { value, name },
        nativeEvent: { data },
      } = event;
      if (name === NAME_ORGANIZATION) {
        visitor.organization = value;
      } else if (name === NAME_NAME) {
        visitor.name = value;
      } else if (name === NAME_PHONE && isValidPhoneCharacter(data)) {
        visitor.phone = value;
      }
      saveVisitor();
    },
    [saveVisitor, visitor],
  );

  return (
    <GreyBox isGrid>
      <VisitorInput
        title={TITLE_ORGANIZATION}
        placeholder={PH_ORGANIZATION}
        handleChange={handleChange}
        name={NAME_ORGANIZATION}
        value={visitor.organization}
        isEditable={visitor.isEditable}
      />
      <VisitorInput
        title={TITLE_NAME}
        placeholder={PH_NAME}
        handleChange={handleChange}
        name={NAME_NAME}
        value={visitor.name}
        isEditable={visitor.isEditable}
      />
      {index === 0 && (
        <VisitorInput
          title={TITLE_PHONE}
          placeholder={PH_PHONE}
          handleChange={handleChange}
          name={NAME_PHONE}
          value={visitor.phone}
          isEditable={visitor.isEditable}
          type="tel"
        />
      )}

      <div className={classes.InputButtonBox}>
        <button
          className={classNames(classes.Button, classes.DeleteButton)}
          onClick={handleDeleteClick}
        >
          {BUTTON_TEXT_DELETE}
        </button>
        {visitor.isEditable === true ? (
          <button className={classNames(classes.Button, classes.InsertButton)} onClick={handleSave}>
            {BUTTON_TEXT_SAVE}
          </button>
        ) : (
          <button
            className={classNames(classes.Button, classes.UpdateButton)}
            onClick={handleUpdateClick}
          >
            {BUTTON_TEXT_UPDATE}
          </button>
        )}
      </div>
    </GreyBox>
  );
};

export default RepresentationForm;
