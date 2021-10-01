import classNames from 'classnames';
import React from 'react';
import classes from 'styles/Common/GreyBox.module.css';

const GreyBox = ({ className, children, hidden }) => {
  return (
    <div className={classNames(classes.box, className)} hidden={hidden}>
      {children}
    </div>
  );
};

export default GreyBox;
