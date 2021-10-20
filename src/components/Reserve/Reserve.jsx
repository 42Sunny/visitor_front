import classNames from 'classnames';
import React from 'react';
import styles from 'assets/styles/ReservePage.module.css';

const ReserveBox = ({ children, className }) => {
  return <div className={classNames(className, styles.ReserveBox)}>{children}</div>;
};

const ReserveInputBox = ({ children, className, handleClick, hidden }) => {
  return (
    <div
      className={classNames(className, styles.ReserveInputBox)}
      onClick={handleClick}
      hidden={hidden}
    >
      {children}
    </div>
  );
};

const ReserveBoxTitle = ({ children, className }) => {
  return <div className={classNames(styles.ReserveBoxTitle, className)}>{children}</div>;
};

const ReserveInput = (props, { className }) => {
  return props.multiline ? (
    <textarea className={classNames(styles.ReserveInput, className)} {...props} />
  ) : (
    <input className={classNames(styles.ReserveInput, className)} {...props} />
  );
};

export { ReserveBox, ReserveBoxTitle, ReserveInputBox, ReserveInput };
