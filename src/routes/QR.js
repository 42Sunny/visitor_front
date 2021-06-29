import { Container, Grid, Typography, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import GridCard from "components/GridCard";
import styles from "styles/QR.module.css";
import { decrypt } from "tools/dataHandler";
import { Link } from 'react-router-dom';

const QR = ({ location }) => {
	const [QR, setQR] = useState("");

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
		if (location !== null) {
			data = location.search.slice(6);
			data = JSON.stringify(decrypt(data, process.env.REACT_APP_AES_KEY));
		}
		generateQR(data);
	}, [location]);

	return (
		<Container maxWidth="sm" className={styles.container}>
			<Grid container spacing={2}>
				<GridCard item xs={12}>
					<Typography variant="h2">방문 확인</Typography>
					<Typography variant="h5">QR 리더기에 QR코드를 보여주세요.</Typography>
					{QR === "" ? (
						<Typography variant="h4">잘못된 접근입니다.</Typography>
					) : (
							<img src={QR} alt="QRCode" className={styles.QR} />
						)}
				</GridCard>
				<Grid item xs={12}>
					<Link to="/" className={`link`}>
						<Button color="primary" variant="contained">인덱스로 돌아가기</Button>
					</Link>
				</Grid>
			</Grid>
		</Container>
	);
};

export default QR;
