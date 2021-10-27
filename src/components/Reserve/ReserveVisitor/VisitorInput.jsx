import SmallTitle from 'components/Common/SmallTitle';
import React from 'react';
import ReserveStar from '../ReserveStar';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { formattedPhone } from 'tools/formattedPhone';

const formattedValue = (name, value) => {
  if (name === 'phone') {
    return formattedPhone(value);
  } else {
    return value;
  }
};

const VisitorInput = ({ isEditable, handleChange, title, placeholder, name, value, type }) => {
  return (
    <div className={classes.InputBox}>
      <SmallTitle>
        {`${title} `}
        <ReserveStar />
      </SmallTitle>
      <div className={classes.ValueBox}>
        {isEditable === true ? (
          <input
            className={classes.Input}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            name={name}
            type={type}
          />
        ) : (
          formattedValue(name, value)
        )}
      </div>
    </div>
  );
};

export default VisitorInput;
