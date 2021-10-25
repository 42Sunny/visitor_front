import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/WhiteBox.module.css';

interface PropTypes {
  className?: string;
  children?: React.ReactNode;
  hidden?: boolean;
  isGrid?: boolean;
}

const WhiteBox = ({ children, className, hidden, isGrid = false }: PropTypes) => {
  return (
    <div
      className={classNames(className, classes.box, isGrid === true ? classes.grid : null)}
      hidden={hidden}
    >
      {children}
    </div>
  );
};

export default WhiteBox;
