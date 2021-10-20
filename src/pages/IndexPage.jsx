import { useHistory } from 'react-router-dom';
import styles from 'assets/styles/IndexPage.module.css';
import logo_inno from 'assets/images/bi_img02.png';
import classNames from 'classnames';

const Index = ({ children }) => {
  return <div className={styles.Index}>{children}</div>;
};

const IndexHeader = ({ children }) => {
  return <div className={styles.IndexHeader}>{children}</div>;
};

const IndexLogo = () => {
  return (
    <div className={styles.IndexLogo}>
      <img src={logo_inno} alt="logo" className={styles.IndexLogoImg} />
    </div>
  );
};

const IndexTitle = ({ children }) => {
  return <div className={styles.IndexTitle}>{children}</div>;
};

const IndexContent = ({ children }) => {
  return <div className={styles.IndexContent}>{children}</div>;
};

const IndexButton = (props) => {
  return (
    <button {...props} className={classNames(styles.IndexButton, props.className)}>
      {props.children}
    </button>
  );
};

const IndexReserveButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/reserve');
  };

  return (
    <IndexButton className={styles.IndexReserveButton} onClick={handleClick}>
      방문 예약
    </IndexButton>
  );
};

const IndexLookupButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/lookup');
  };

  return (
    <IndexButton className={styles.IndexLookupButton} onClick={handleClick}>
      예약 조회
    </IndexButton>
  );
};

const IndexPage = () => {
  return (
    <>
      <Index>
        <IndexHeader>
          <IndexLogo />
          <IndexTitle>방문 예약 시스템</IndexTitle>
        </IndexHeader>
        <IndexContent>
          <IndexReserveButton />
          <IndexLookupButton />
        </IndexContent>
      </Index>
    </>
  );
};

export default IndexPage;
