import classNames from 'classnames';
import React from 'react';
import styles from 'assets/styles/Common/Page.module.css';

interface PropTypes {
  className?: string;
  children?: React.ReactNode;
}

const Page = ({ children, className }: PropTypes) => {
  return <div className={classNames(styles.Page, className)}>{children}</div>;
};

export default Page;
