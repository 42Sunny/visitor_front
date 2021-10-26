import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/WhiteBox.module.css';

interface PropTypes {
  className?: string;
  children?: React.ReactNode;
  hidden?: boolean;
  isGrid?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const WhiteBox = ({ children, className, hidden, isGrid = false, onClick }: PropTypes) => {
  return (
    <div
      className={classNames(className, classes.box, isGrid === true ? classes.grid : null)}
      hidden={hidden}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default WhiteBox;
