import React from 'react';
import QRCode from './QRCode';
import QRMessage from './QRMessage';
import classes from 'assets/styles/QR/QRContainer.module.css';
import classNames from 'classnames';

type PropTypes = { className: string | object };

const QRContainer = ({ className }: PropTypes) => {
  return (
    <div className={classNames(classes.QRContainer, className)}>
      <div className={classNames(classes.QRBox)}>
        <QRCode />
        <QRMessage />
      </div>
    </div>
  );
};

export default QRContainer;
