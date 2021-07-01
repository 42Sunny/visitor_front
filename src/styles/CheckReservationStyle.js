import { makeStyles } from "@material-ui/styles"

export const useStyles = makeStyles(
	{
		inputBox: {
			display: "flex",
			justifyContent: "space-around",
			flexDirection: "column",
		},
		checkButton: {
			width: "100%",
		},
		rootContainer: {
			marginTop: "1vh",
		},
		checkList: {
			marginTop: "3vh",
		},
		checkElem: {
			display: "flex",
			height: "5vh",
			alignItems: "center",
			justifyContent: "center",
		},
		checkListTitle: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		checkHeader: {
			marginBottom: "2vh",
		},
		checkListComment: {
			width: "100%",
			marginBottom: "1vh",
		}
	}
)