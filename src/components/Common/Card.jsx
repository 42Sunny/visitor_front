import React from 'react';
import styles from 'assets/styles/Common/Card.module.css';

const CardLine = ({ title, content }) => {
  return (
    <div className={styles.CardLine}>
      <div className={styles.CardLineTitle}>{title}</div>
      <div className={styles.CardLineContent}>{content}</div>
    </div>
  );
};

const CardTitle = ({ children }) => {
  return <div className={styles.Title}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className={styles.Content}>{children}</div>;
};

const CardContainer = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

const Card = ({ children, title }) => {
  return (
    <CardContainer>
      {title && <CardTitle>{title}</CardTitle>}
      {children && <CardContent>{children}</CardContent>}
    </CardContainer>
  );
};

export { Card, CardLine, CardTitle, CardContent, CardContainer };
