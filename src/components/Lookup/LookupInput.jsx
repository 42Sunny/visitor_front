import React, { useContext, useState } from 'react';
import icon_search from 'assets/images/icon_search.svg';
import classes from 'assets/styles/LookupPage.module.css';
import { getReserves } from 'tools/apiHandler';
import { LookupContext } from 'contexts/LookupContext';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';

const LookupInput = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { setReserves } = useContext(LookupContext);

  const handleChangeName = ({ target: { value } }) => {
    setName(value);
  };

  const handleChangePhone = ({ nativeEvent: { data }, target: { value } }) => {
    if (isNaN(data) === false) setPhone(value);
  };

  const hanldeClick = async () => {
    await getReserves(name, phone)
      .then((response) => {
        const {
          data: { error },
        } = response;
        if (!error) {
          let results = response.data;
          results.reverse();
          results = results.map((result) => ({ ...result, visitors: result.visitor }));
          setReserves(results);
        } else setReserves([]);
      })
      .catch(() => {
        //TODO: postError
        setReserves([]);
      });
  };

  return (
    <WhiteBox isGrid>
      <BigTitle>예약자 정보</BigTitle>
      <GreyBox>
        <input
          placeholder="이름을 입력해주세요"
          defaultValue={name}
          onChange={handleChangeName}
          className={classes.Input}
        />
      </GreyBox>
      <GreyBox>
        <input
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          onChange={handleChangePhone}
          type="number"
          className={classes.Input}
        />
      </GreyBox>
      <button className={classes.LookupInputSearchButton} onClick={hanldeClick}>
        <img src={icon_search} alt="search" className={classes.LookupInputSearchImg} />
        조회
      </button>
    </WhiteBox>
  );
};

export default LookupInput;
