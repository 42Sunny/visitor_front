import React from 'react';
import classes from 'assets/styles/Reserve/ReserveVisitor.module.css';
import { formattedPhone } from 'tools/formattedPhone';
import ReserveSmallTitle from '../ReserveSmallTitle';

type PropTypes = {
  placeholder: string;
  isEditable: boolean;
  title: string;
  value: string;
  name: string;
  type?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const formattedValue = (name: string, value: string) => {
  if (name === 'phone') {
    return formattedPhone(value);
  } else {
    return value;
  }
};

const VisitorInput = ({
  isEditable,
  handleChange,
  title,
  placeholder,
  name,
  value,
  type,
}: PropTypes) => {
  return (
    <div className={classes.InputBox}>
      <ReserveSmallTitle title={title} />
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

export default React.memo(VisitorInput);
