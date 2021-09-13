import React from 'react';
import styles, { selected } from './Header.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const RESERVE_PATH = '/reserve';
const LOOKUP_PATH = '/lookup';

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();

  if (pathname === RESERVE_PATH || pathname === LOOKUP_PATH) {
    return (
      <div className={styles.Header}>
        <div className={styles.TitleBox}>
          <div
            className={classNames(styles.Title, { [selected]: pathname === RESERVE_PATH })}
            onClick={() => {
              history.push(RESERVE_PATH);
            }}
          >
            {!location.state ? '방문 예약' : '예약 수정'}
          </div>
          <div
            className={classNames(styles.Title, { [selected]: pathname === LOOKUP_PATH })}
            onClick={() => {
              history.push(LOOKUP_PATH);
            }}
          >
            예약 조회
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export { Header };
