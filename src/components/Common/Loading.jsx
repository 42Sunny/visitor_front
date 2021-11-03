import React from 'react';
import ReactLoading from 'react-loading';
import classes from 'assets/styles/Common/Loading.module.css';
import classNames from 'classnames';

const Loading = ({ isHidden }) => {
  return (
    <div className={classNames(classes.LoadingContainer, { [classes.Hidden]: isHidden })}>
      <ReactLoading type={'spin'} />
    </div>
  );
};

export default Loading;
