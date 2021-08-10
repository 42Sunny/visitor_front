import React from 'react';
import styles from 'styles/ReservePage.module.css';
import classNames from 'tools/classNames';

const ReserveBox = ({ children, className }) => {
  return <div className={classNames(className, styles.ReserveBox)}>{children}</div>;
};

const ReserveInputBox = ({ children, className, handleClick }) => {
  return (
    <div className={classNames(className, styles.ReserveInputBox)} onClick={handleClick}>
      {children}
    </div>
  );
};

const ReserveBoxTitle = ({ children, className }) => {
  return <div className={classNames(styles.ReserveBoxTitle, className)}>{children}</div>;
};

const ReserveInput = (props, { className }) => {
  return props.multiline ? (
    <textarea className={classNames(styles.ReserveStaffInput, className)} {...props} />
  ) : (
    <input className={classNames(styles.ReserveStaffInput, className)} {...props} />
  );
};

export { ReserveBox, ReserveBoxTitle, ReserveInputBox, ReserveInput };
