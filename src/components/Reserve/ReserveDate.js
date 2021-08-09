import React, { useContext, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReserveBox, ReserveBoxTitle, ReserveInputBox } from './Reserve';
import ko from 'date-fns/locale/ko';
import styles from 'styles/ReservePage.module.css';
import icon_calendar from 'images/icon-calendar.svg';
import { ReserveContext } from 'contexts/ReserveContext';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';

registerLocale('ko', ko);

const ReserveDate = () => {
  const { date, setDate, dateError } = useContext(ReserveContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeDate = (date) => {
    setDate(date);
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <ReserveBox>
      <ReserveBoxTitle>
        날짜 및 시간 <ReserveStar />
      </ReserveBoxTitle>
      <ReserveInputBox className={styles.ReserveDatePickerBox}>
        <button onClick={handleClickOpen} className={styles.ReserveDatePickerButton}>
          <DatePicker
            showTimeSelect
            locale="ko"
            selected={date}
            dateFormat="P p"
            onChange={handleChangeDate}
            onClickOutside={handleClickOutside}
            open={isOpen}
            readOnly
            disabled
          />
          <img src={icon_calendar} alt="icon-calendar" className={styles.ReserveDatePickerImg} />
        </button>
      </ReserveInputBox>
      {dateError && <ReserveError>필수 정보입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReserveDate;
