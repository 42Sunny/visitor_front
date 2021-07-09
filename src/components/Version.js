import packageJson from "../../package.json";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles({
	version: {
		bottom: "0px",
		display: "flex",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "0.3em",
	}
})

const Version = () => {
	const classes = useStyles();
	return <Box className={classes.version}>v{packageJson.version}</Box>
}

export default Version;