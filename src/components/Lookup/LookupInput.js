import React, { useContext, useState } from 'react';
import icon_search from 'images/icon_search.svg';
import styles from 'styles/LookupPage.module.css';
import { getReserves } from 'tools/apiHandler';
import { LookupContext } from 'contexts/LookupContext';

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
    <div className={styles.LookupInputBox}>
      <div className={styles.LookupInputTitle}>예약자 정보</div>
      <div className={styles.LookupInputs}>
        <input
          className={styles.LookupInputInput}
          placeholder="성함을 입력해주세요"
          defaultValue={name}
          onChange={handleChangeName}
        />
        <input
          className={styles.LookupInputInput}
          placeholder="휴대폰 번호를 입력해주세요"
          value={phone}
          onChange={handleChangePhone}
          type="tel"
        />
      </div>
      <div className={styles.LookupInputButtonBox}>
        <button className={styles.LookupInputSearchButton} onClick={hanldeClick}>
          <img src={icon_search} alt="search" className={styles.LookupInputSearchImg} />
          조회
        </button>
      </div>
    </div>
  );
};

export default LookupInput;
