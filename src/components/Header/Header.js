import React, { useEffect, useState } from 'react';
import classes, { selected } from 'styles/Header/Header.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logo from 'images/bi_img02.png';

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
    <div className={classes.Header}>
      <div className={classes.Content}>
        <div className={classes.TitleBox}>
          {(basePath === RESERVE_PATH || basePath === LOOKUP_PATH) && (
            <>
              <div
                className={classNames(classes.Title, { [selected]: basePath === RESERVE_PATH })}
                onClick={() => {
                  if (basePath !== RESERVE_PATH) history.push(RESERVE_PATH);
                }}
              >
                {!location.state ? '방문 예약' : '예약 수정'}
              </div>
              {!location.state && (
                <div
                  className={classNames(classes.Title, { [selected]: basePath === LOOKUP_PATH })}
                  onClick={() => {
                    if (basePath !== LOOKUP_PATH) history.push(LOOKUP_PATH);
                  }}
                >
                  예약 조회
                </div>
              )}
            </>
          )}
          {basePath === RESERVE_INFO_PATH && (
            <div
              className={classNames(classes.Title, { [selected]: basePath === RESERVE_INFO_PATH })}
            >
              상세 내역
            </div>
          )}
          {basePath === QR_PATH && (
            <div className={classNames(classes.Title, { [selected]: basePath === QR_PATH })}>
              QR 체크인
            </div>
          )}
        </div>
        <div className={classes.LogoBox}>
          <img
            className={classes.LogoImg}
            src={logo}
            alt="logo"
            onClick={() => {
              history.push('/');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { Header };
