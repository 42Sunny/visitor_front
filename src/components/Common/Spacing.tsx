import React from 'react';
import classes from 'assets/styles/Common/Spacing.module.css';
import classNames from 'classnames';

type PropTypes = { one: boolean; two: boolean; three: boolean };

const Spacing = ({ one, two, three }: PropTypes) => {
  return (
    <div
      className={classNames({ [classes.One]: one, [classes.Two]: two, [classes.Three]: three })}
    />
  );
};

export default Spacing;
