import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/TransparentInput.module.css';

const TransparentInput = ({ className, onChange, placeholder, value }) => {
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