import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/SmallTitle.module.css';

interface PropTypes {
  className?: string;
  children?: React.ReactNode;
}

const SmallTitle = ({ children, className }: PropTypes) => {
  return <div className={classNames(className, classes.text)}>{children}</div>;
};

export default SmallTitle;
