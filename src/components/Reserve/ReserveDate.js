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
import moment from 'moment';
import 'styles/Reserve/DatePicker.css';

registerLocale('ko', ko);

const ReserveDate = () => {
  const { date, setDate, dateError } = useContext(ReserveContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeDate = (value) => {
    setDate(value);
    if (date.getHours() !== value.getHours() || date.getMinutes() !== value.getMinutes()) {
      setIsOpen(false);
    }
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
        <DatePicker
          showTimeSelect
          selected={date}
          locale="ko"
          dateFormat="P p"
          onChange={handleChangeDate}
          onClickOutside={handleClickOutside}
          open={isOpen}
          readOnly
          disabled
          className={styles.ReserveDatePicker}
          minDate={new Date()}
          popperModifiers={{
            preventOverflow: { enabled: true },
          }}
          dayClassName={(day) => {
            if (day.getDay() === 0) return 'datepicker__sun';
            else if (day.getDay() === 6) return 'datepicker__sat';
            else return 'datepicker__day';
          }}
        />
        <button onClick={handleClickOpen} className={styles.ReserveDatePickerButton}>
          <div className={styles.ReserveDatePickerDate}>
            {new moment(date).format('YYYY. MM. DD hh:mm')}
          </div>
          <img src={icon_calendar} alt="icon-calendar" className={styles.ReserveDatePickerImg} />
        </button>
      </ReserveInputBox>
      {dateError && <ReserveError>필수 정보입니다.</ReserveError>}
    </ReserveBox>
  );
};

export default ReserveDate;
