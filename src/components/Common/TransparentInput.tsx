import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/TransparentInput.module.css';

type PropTypes = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  value?: string;
};

const TransparentInput = ({ className, onChange, placeholder, value }: PropTypes) => {
  return (
    <input
      className={classNames(className, classes.input)}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TransparentInput;
