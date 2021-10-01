import classNames from 'classnames';
import React from 'react';
import classes from 'styles/Common/TransparentInput.module.css';

const TransparentInput = ({ className, onChange, placeholder }) => {
  return (
    <input
      className={classNames(className, classes.input)}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TransparentInput;
