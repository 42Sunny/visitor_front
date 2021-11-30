import React from 'react';
import classes from 'assets/styles/Common/Button.module.css';
import classNames from 'classnames';

type PropTypes = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string | Object;
};

const Button = ({ onClick, disabled, children, className }: PropTypes) => {
  return (
    <button onClick={onClick} disabled={disabled} className={classNames(classes.Button, className)}>
      {children}
    </button>
  );
};

export default React.memo(Button);
