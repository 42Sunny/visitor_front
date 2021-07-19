import { makeStyles, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import styles from "styles/QR.module.css";

const useStyles = makeStyles({
  qrBox: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorBox: {
    width: "50vw",
    height: "50vw",
    fontSize: "2.5rem",
    background: "white",
    textAlign: "center"
  }
});

const QR = (props) => {
  const [QR, setQR] = useState("");

  const classes = useStyles();

  const generateQR = async (url) => {
    try {
      const data = await QRCode.toDataURL(url);
      setQR(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const {
      match: {
        params: { code },
      },
    } = props;
    generateQR(code);
  }, [props]);

  return (
    <Box className={classes.qrBox}>
      {QR === "" ? (
        <Box className={classes.errorBox}>주소가 잘못되었습니다.</Box>
      ) : (
        <img src={QR} alt="QRCode" className={styles.qrImg} />
      )}
    </Box>
  );
};

export default QR;
