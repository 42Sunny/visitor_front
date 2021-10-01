import classNames from 'classnames';
import React from 'react';
import classes from 'styles/Common/BigTitle.module.css';

const BigTitle = ({ className, children }) => {
  return <div className={classNames(className, classes.text)}>{children}</div>;
};

export default BigTitle;
