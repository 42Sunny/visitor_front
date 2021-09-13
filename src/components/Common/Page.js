import classNames from 'classnames';
import React from 'react';
import styles from 'styles/Common/Page.module.css';

const Page = ({ children, className }) => {
  return <div className={classNames(styles.Page, className)}>{children}</div>;
};

export default Page;
