import SmallTitle from 'components/Common/SmallTitle';
import React from 'react';
import ReserveStar from '../ReserveStar';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';

const VisitorInput = ({ isEditable, handleChange, title, placeholder, name, value }) => {
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
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default VisitorInput;
