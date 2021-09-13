import React, { useEffect, useState } from 'react';
import styles, { selected } from './Header.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const RESERVE_PATH = '/reserve';
const LOOKUP_PATH = '/lookup';
const RESERVE_INFO_PATH = '/reserve-info';
const QR_PATH = '/qr';

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  const [basePath, setBasePath] = useState('');

  useEffect(() => {
    const basePath = `/${pathname.split('/')[1]}`;
    setBasePath(basePath);
  }, [pathname]);

  return (
    <div className={styles.Header}>
      <div className={styles.LogoText}>Innovation Academy</div>
      <div className={styles.TitleBox}>
        <div
          className={classNames(styles.Title, { [selected]: basePath === RESERVE_PATH })}
          onClick={() => {
            history.push(RESERVE_PATH);
          }}
        >
          {!location.state ? '방문 예약' : '예약 수정'}
        </div>
        <div
          className={classNames(styles.Title, { [selected]: basePath === LOOKUP_PATH })}
          onClick={() => {
            history.push(LOOKUP_PATH);
          }}
        >
          예약 조회
        </div>
        {basePath === RESERVE_INFO_PATH && (
          <div className={classNames(styles.Title, { [selected]: basePath === RESERVE_INFO_PATH })}>
            상세 내역
          </div>
        )}
        {basePath === QR_PATH && (
          <div className={classNames(styles.Title, { [selected]: basePath === QR_PATH })}>
            QR 체크인
          </div>
        )}
      </div>
    </div>
  );
};

export { Header };
