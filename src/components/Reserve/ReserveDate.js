import React, { useContext, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import classes from 'styles/Reserve/ReserveDate.module.css';
import icon_calendar from 'images/icon-calendar.svg';
import { ReserveContext } from 'contexts/ReserveContext';
import ReserveError from './ReserveError';
import ReserveStar from './ReserveStar';
import moment from 'moment';
import 'styles/Reserve/DatePicker.css';
import BigTitle from 'components/Common/BigTitle';
import WhiteBox from 'components/Common/WhiteBox';
import GreyBox from 'components/Common/GreyBox';

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
    <WhiteBox isGrid>
      <BigTitle>
        날짜 및 시간 <ReserveStar />
      </BigTitle>
      <GreyBox className={classes.DatePickerBox}>
        <DatePicker
          showTimeSelect
          selected={date}
          locale="ko"
          onChange={handleChangeDate}
          onClickOutside={handleClickOutside}
          open={isOpen}
          readOnly
          disabled
          className={classes.DatePicker}
          minDate={new Date()}
          dayClassName={(day) => {
            if (day.getDay() === 0) return 'datepicker__sun';
            else if (day.getDay() === 6) return 'datepicker__sat';
            else return 'datepicker__day';
          }}
        />
        <button onClick={handleClickOpen} className={classes.DatePickerButton}>
          <div className={classes.DatePickerContent}>
            <div className={classes.DatePickerText}>
              {new moment(date).format('YYYY. MM. DD HH:mm')}
            </div>
            <img src={icon_calendar} alt="icon-calendar" className={classes.DatePickerImg} />
          </div>
        </button>
      </GreyBox>
      {dateError && <ReserveError>필수 정보입니다.</ReserveError>}
    </WhiteBox>
  );
};

export default ReserveDate;
