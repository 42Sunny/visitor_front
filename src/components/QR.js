import { Typography, Button, makeStyles, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import styles from "styles/QR.module.css";
import { decrypt } from "tools/dataHandler";
import phoneImg from "images/phone.png";
import msg from 'images/msg.png';

const useStyles = makeStyles(
  {
    phoneBox: {
      width: "500px",
      height: "500px",
    },
    phone: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    msgBox: {
      width: "200px",
      height: "200px",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      left: "175px",
      top: "80px"
    },
    msgImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }
  }
)

const QR = (props) => {
  const [QR, setQR] = useState("");
  const [openMsg, setOpenMsg] = useState(false);

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
    let data = "";
    if (props.location !== undefined) {
      data = props.location.search.slice(6);
      data = JSON.stringify(decrypt(data, process.env.REACT_APP_AES_KEY));
    }
    else if (props.code !== undefined) {
      data = JSON.stringify(decrypt(props.code, process.env.REACT_APP_AES_KEY));
    }
    generateQR(data);
  }, [props.location, props.code]);

  const handleOpenMsgClick = () => {
    setOpenMsg(true);
  }

  return (
    <Box className={classes.phoneBox}>
      <img src={phoneImg} alt="phone" className={classes.phone} />
      {openMsg === false ?
        <Box className={classes.msgBox}>
          <Typography variant="h3">방문객</Typography>
          <Typography variant="subtitle2">메세지가 도착했습니다!</Typography>
          <Button onClick={handleOpenMsgClick}>
            <img src={msg} alt="msg" className={classes.msgImg} />
          </Button>
        </Box>
        :
        <Box className={classes.msgBox}>
          <Typography variant="h3">방문 확인</Typography>
          <Typography variant="subtitle2">QR 리더기에 보여주세요.</Typography>
          {QR === "" ? (
            <Typography variant="h5">잘못된 접근입니다.</Typography>
          ) : (
            <img src={QR} alt="QRCode" className={styles.QR} />
          )}
        </Box>
      }
    </Box>
  );
};

export default QR;