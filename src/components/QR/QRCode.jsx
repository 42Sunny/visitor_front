import { useEffect, useState } from 'react';
import qr from 'qrcode';
import { useParams } from 'react-router-dom';
import classes from 'assets/styles/QR/QR.module.css';

const ERROR_MESSAGE = '주소가 잘못되었습니다.';

const QRCode = () => {
  const [QRUrl, setQRUrl] = useState('');
  const params = useParams();

  const generateQR = async (url) => {
    try {
      const data = await qr.toDataURL(url);
      setQRUrl(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const { code } = params;
    generateQR(code);
  }, [params]);

  return (
    <div>
      {QRUrl === '' ? (
        <div>{ERROR_MESSAGE}</div>
      ) : (
        <img src={QRUrl} alt="QRCode" className={classes.QR} />
      )}
    </div>
  );
};

export default QRCode;
