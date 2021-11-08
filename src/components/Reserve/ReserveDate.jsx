import React, { useContext, useState, useCallback } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import classes from 'assets/styles/Reserve/ReserveDate.module.css';
import icon_calendar from 'assets/images/icon-calendar.svg';
import { ReserveContext } from 'contexts/ReserveContext';
import ReserveError from './ReserveError';
import moment from 'moment';
import 'assets/styles/Reserve/DatePicker.css';
import WhiteBox from 'components/Common/WhiteBox';
import GreyBox from 'components/Common/GreyBox';
import ReserveBigTitle from './ReserveBigTitle';

const DATE_TITLE = '날짜 및 시간';

registerLocale('ko', ko);

const VReserveDate = React.memo(
  ({ date, onChangeDate, onHandleClickOutside, isOpen, onClickOpen, errorDateMessage }) => {
    return (
      <WhiteBox isGrid>
        <ReserveBigTitle title={DATE_TITLE} />
        <GreyBox className={classes.DatePickerBox}>
          <DatePicker
            showTimeSelect
            selected={date}
            locale="ko"
            onChange={onChangeDate}
            onClickOutside={onHandleClickOutside}
            open={isOpen}
            readOnly
            disabled
            minDate={new Date()}
            className={classes.DatePicker}
            dayClassName={(day) => {
              if (day.getDay() === 0) return 'datepicker__sun';
              else if (day.getDay() === 6) return 'datepicker__sat';
              else return 'datepicker__day';
            }}
          />
          <button onClick={onClickOpen} className={classes.DatePickerButton}>
            <div className={classes.DatePickerContent}>
              <div className={classes.DatePickerText}>
                {new moment(date).format('YYYY. MM. DD HH:mm')}
              </div>
              <img src={icon_calendar} alt="icon-calendar" className={classes.DatePickerImg} />
            </div>
          </button>
        </GreyBox>
        <ReserveError>{errorDateMessage}</ReserveError>
      </WhiteBox>
    );
  },
);

const ReserveDate = () => {
  const { date, setDate, errorDateMessage } = useContext(ReserveContext);
  const [isOpen, setIsOpen] = useState(false);

  const reserveDateProps = {
    date,
    isOpen,
    errorDateMessage,
    onChangeDate: useCallback(
      (value) => {
        setDate(value);
        if (date.getHours() !== value.getHours() || date.getMinutes() !== value.getMinutes()) {
          setIsOpen(false);
        }
      },
      [date, setDate],
    ),
    onClickOpen: useCallback(() => {
      setIsOpen(true);
    }, []),
    onClickOutside: useCallback(() => {
      setIsOpen(false);
    }, []),
  };

  return <VReserveDate {...reserveDateProps} />;
};

export default ReserveDate;
