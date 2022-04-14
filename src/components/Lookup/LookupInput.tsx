import React, { useContext, useState } from 'react';
import icon_search from 'assets/images/icon_search.svg';
import classes from 'assets/styles/LookupPage.module.css';
import { getReserves } from 'tools/API';
import { LookupContext } from 'contexts/LookupContext';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';

type HandleChangeType = React.ChangeEventHandler<HTMLInputElement>;
type ChangeEventTypes = React.ChangeEvent<HTMLInputElement> & {
  nativeEvent: { data: string | null };
  target: { value: string };
};

const NAME_INPUT_PLACEHOLDER = '이름을 입력해주세요.';
const PHONE_INPUT_PLACEHOLDER = '휴대폰 번호를 입력해주세요';
const TITLE_TEXT = '예약자 정보';
const LOOKUP_BUTTON_TEXT = '조회';

const LookupInput = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { setReserves } = useContext(LookupContext);

  const handleChangeName: HandleChangeType = ({ target: { value } }: ChangeEventTypes) => {
    setName(value);
  };

  const handleChangePhone: HandleChangeType = ({
    nativeEvent: { data },
    target: { value },
  }: ChangeEventTypes) => {
    if (data === null) setPhone(value);
    else if (isNaN(parseInt(data)) === false) setPhone(value);
  };

  const handleClick = async () => {
    const response = await getReserves(name, phone);
    const {
      data: { error },
    } = response;
    if (!error) {
      let results = response.data;
      results.reverse();
      //TODO: any 삭제
      results = results.map((result: { visitor: any }) => ({
        ...result,
        visitors: result.visitor,
      }));
      setReserves(results);
    } else setReserves([]);
  };

  return (
    <WhiteBox isGrid>
      <BigTitle>{TITLE_TEXT}</BigTitle>
      <GreyBox>
        <input
          placeholder={NAME_INPUT_PLACEHOLDER}
          defaultValue={name}
          onChange={handleChangeName}
          className={classes.Input}
        />
      </GreyBox>
      <GreyBox>
        <input
          placeholder={PHONE_INPUT_PLACEHOLDER}
          value={phone}
          onChange={handleChangePhone}
          type="number"
          className={classes.Input}
        />
      </GreyBox>
      <button className={classes.LookupInputSearchButton} onClick={handleClick}>
        <img src={icon_search} alt="search" className={classes.LookupInputSearchImg} />
        {LOOKUP_BUTTON_TEXT}
      </button>
    </WhiteBox>
  );
};

export default LookupInput;
