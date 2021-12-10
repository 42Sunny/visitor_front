import classNames from 'classnames';
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import classes from './TimePicker.module.css';

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const useTimePicker = () => {
  const [selected, setSelected] = useState(0);
  const [degree, setDegree] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = useState(new Date());

  const calculateDegree = (cur: number) => {
    const gap =
      Math.abs(cur - selected) > 6
        ? (12 - Math.abs(cur - selected)) * Math.sign(cur - selected) * -1
        : Math.abs(cur - selected) === 6
        ? 6
        : cur - selected;
    setSelected(cur);
    setDegree((degree) => degree + gap * 30);
  };

  return {
    degree,
    calculateDegree,
    minutes: date.getMinutes(),
    hours: date.getHours(),
    AMPM: date.getHours() > 12 ? 'pm' : 'am',
  };
};

const TimePicker = () => {
  const { calculateDegree, degree, minutes, hours, AMPM } = useTimePicker();

  return (
    <div className={classes.Container}>
      <div>
        <div>{AMPM}</div>
        <div>{hours % 12}</div>
        <div>{minutes}</div>
      </div>
      <div className={classes.Clock}>
        {HOURS.map((value, idx) => (
          <button
            className={classNames(classes[`Target-${idx}`], classes.Target)}
            key={value}
            onClick={() => calculateDegree(idx)}
          >
            {value}
          </button>
        ))}
        <div
          className={classes.Circle}
          style={{ transform: `rotate(${degree}deg) translateY(-11rem)` }}
        />
        <div
          className={classes.Line}
          style={{ transform: `rotate(${degree}deg) translateY(-5.5rem)` }}
        />
        <div className={classes.Center} />
      </div>
      <div className={classes.AMPMBox}>
        <button className={classes.AMPMButton}>오전</button>
        <button className={classes.AMPMButton}>오후</button>
      </div>
    </div>
  );
};

export default TimePicker;
