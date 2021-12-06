import { ReserveContext } from 'contexts/ReserveContext';
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import classes from 'assets/styles/Reserve/ReservePurpose.module.css';
import ReserveError from './ReserveError';
import WhiteBox from 'components/Common/WhiteBox';
import GreyBox from 'components/Common/GreyBox';
import ReserveBigTitle from './ReserveBigTitle';

type PropTypes = {
  onSelect: React.ChangeEventHandler<HTMLSelectElement>;
  selected: string;
  isDirectInput: boolean;
  onChange: React.ReactEventHandler;
  purpose: string;
  purposeInput: React.MutableRefObject<any>;
  errorPurposeMessage: string;
};

const DIRECT_INPUT = 'direct_input';
const PURPOSE_TITLE = '목적';

const VReservePurpose = React.memo(
  ({
    onSelect,
    selected,
    isDirectInput,
    onChange,
    purpose,
    purposeInput,
    errorPurposeMessage,
  }: PropTypes) => (
    <WhiteBox isGrid>
      <ReserveBigTitle title={PURPOSE_TITLE} />
      <GreyBox>
        <select name="purpose" onChange={onSelect} className={classes.Selector} value={selected}>
          <option value="">방문 목적을 선택해주세요</option>
          <option value="멘토링">멘토링</option>
          <option value="회의">회의</option>
          <option value={DIRECT_INPUT}>직접 입력</option>
        </select>
      </GreyBox>
      <GreyBox hidden={!isDirectInput}>
        <input
          placeholder="방문 목적을 입력해주세요"
          onChange={onChange}
          value={purpose}
          ref={purposeInput}
          hidden={!isDirectInput}
          className={classes.Input}
        />
      </GreyBox>
      <ReserveError>{errorPurposeMessage}</ReserveError>
    </WhiteBox>
  ),
);

const ReservePurpose = () => {
  const { purpose, setPurpose, errorPurposeMessage } = useContext(ReserveContext);
  const [isDirectInput, setIsDirectInput] = useState(false);
  const [selected, setSelected] = useState('');
  const purposeInput = useRef<any>();

  useEffect(() => {
    if (purpose !== '') {
      if (purpose === '회의' || purpose === '멘토링') {
        setSelected(purpose);
      } else {
        setSelected(DIRECT_INPUT);
      }
    }
  }, [purpose]);

  useEffect(() => {
    setIsDirectInput(selected === DIRECT_INPUT);
    if (selected !== DIRECT_INPUT) {
      setPurpose(selected);
    }
  }, [selected, setPurpose]);

  const reservePurposeProps = {
    purpose,

    selected,

    purposeInput,

    isDirectInput,

    errorPurposeMessage,

    onSelect: useCallback(
      (event) => {
        const {
          target: { value },
        } = event;
        setSelected(value);
        if (value === DIRECT_INPUT) {
          purposeInput.current.focus();
          setPurpose('');
        }
      },
      [setPurpose],
    ),

    onChange: useCallback(
      (event) => {
        const {
          target: { value },
        } = event;
        setPurpose(value);
      },
      [setPurpose],
    ),
  };

  return <VReservePurpose {...reservePurposeProps} />;
};

export default ReservePurpose;
