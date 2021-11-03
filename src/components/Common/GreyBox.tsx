import classNames from 'classnames';
import React from 'react';
import classes from 'assets/styles/Common/GreyBox.module.css';

type PropTypes = {
  className?: string;
  children?: React.ReactNode;
  hidden?: boolean;
  isGrid?: boolean;
};

const GreyBox = ({ className, children, hidden, isGrid }: PropTypes) => {
  return (
    <div
      className={classNames(classes.box, className, isGrid === true ? classes.grid : null)}
      hidden={hidden}
    >
      {children}
    </div>
  );
};

export default GreyBox;
