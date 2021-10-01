import React, { useContext, useState } from 'react';
import icon_search from 'images/icon_search.svg';
import classes from 'styles/LookupPage.module.css';
import { getReserves } from 'tools/apiHandler';
import { LookupContext } from 'contexts/LookupContext';
import WhiteBox from 'components/Common/WhiteBox';
import BigTitle from 'components/Common/BigTitle';
import GreyBox from 'components/Common/GreyBox';

const LookupInput = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { setReserve } = useContext(LookupContext);

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
          const results = response.data;
          results.reverse();
          setReserve(response.data);
        } else setReserve([]);
      })
      .catch(() => {
        //TODO: postError
        setReserve([]);
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
          type="tel"
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
