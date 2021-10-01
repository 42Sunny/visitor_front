import React from 'react';
import classNames from 'tools/classNames';
import classes from 'styles/Common/SmallTitle.module.css';

const SmallTitle = ({ children, className }) => {
  return <div className={classNames(className, classes.text)}>{children}</div>;
};

export default SmallTitle;