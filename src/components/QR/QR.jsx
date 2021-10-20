import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useParams } from 'react-router-dom';

const QR = ({ className }) => {
  const [QR, setQR] = useState('');
  const params = useParams();

  const generateQR = async (url) => {
    try {
      const data = await QRCode.toDataURL(url);
      setQR(data);
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
      {QR === '' ? (
        <div>주소가 잘못되었습니다.</div>
      ) : (
        <img src={QR} alt="QRCode" className={className} />
      )}
    </div>
  );
};

export default QR;
