import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  inputBox: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  checkButton: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0)",
  },
  rootContainer: {
    minWidth: "800px",
    maxWidth: "60vw",
    padding: "2vh",
    borderRadius: "1vh",
    backgroundColor: "rgba(255,255,255,0.7)",
    minHeight: "100%",
    width: "100%"
  },
  checkList: {
    marginTop: "3vh",
  },
  checkElem: {
    display: "flex",
    height: "5vh",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2vh",
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
  },
  deleteBtn: {
    backgroundColor: "rgba(255,255,255,0)",
  },
  deleteGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkReservationBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    padding: "5vh",
  }
});
