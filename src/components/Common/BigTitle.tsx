import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/BigTitle.module.css';

type PropTypes = {
  className?: string;
  children?: React.ReactNode;
};

const BigTitle = ({ className, children }: PropTypes) => {
  return <div className={classNames(className, classes.text)}>{children}</div>;
};

export default React.memo(BigTitle);
