import React, { useMemo } from 'react';
import packageJson from '../../../package.json';
import classes from 'assets/styles/Footer/Footer.module.css';

const makeVersionInfo = (version: string) => `v${version}`;

const Footer = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const version = useMemo(() => makeVersionInfo(packageJson.version), [packageJson.version]);

  return <footer className={classes.Footer}>{version}</footer>;
};

export default Footer;
