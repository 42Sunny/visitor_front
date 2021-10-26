import React from 'react';
import packageJson from '../../../package.json';
import classes from 'assets/styles/Footer/Footer.module.css';

const Footer = () => {
  return <footer className={classes.Footer}>v{packageJson.version}</footer>;
};

export default Footer;
