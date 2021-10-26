import { useEffect, useState } from 'react';
import qr from 'qrcode';
import { useParams } from 'react-router-dom';
import classes from 'assets/styles/QR/QRCode.module.css';
import classNames from 'classnames';

const ERROR_MESSAGE = '주소가 잘못되었습니다.';

type PropTypes = { className?: string };

const QRCode = ({ className }: PropTypes) => {
  const [QRUrl, setQRUrl] = useState('');
  const params = useParams();

  const generateQR = async (url: string) => {
    try {
      const data = await qr.toDataURL(url);
      setQRUrl(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const { code } = params as { code: string };
    generateQR(code);
  }, [params]);

  return (
    <div className={classNames(classes.QRCodeBox, className)}>
      {QRUrl === '' ? (
        <div>{ERROR_MESSAGE}</div>
      ) : (
        <img src={QRUrl} alt="QRCode" className={classes.QR} />
      )}
    </div>
  );
};

export default QRCode;
