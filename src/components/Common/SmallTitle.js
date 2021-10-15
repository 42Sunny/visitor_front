import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/SmallTitle.module.css';

const SmallTitle = ({ children, className }) => {
  return <div className={classNames(className, classes.text)}>{children}</div>;
};

export default SmallTitle;
