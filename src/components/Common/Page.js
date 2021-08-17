import React from 'react';
import styles from 'styles/Common/Page.module.css';

const Page = ({ children }) => {
  return <div className={styles.Page}>{children}</div>;
};

export default Page;
