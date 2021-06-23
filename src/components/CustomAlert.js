import { usePopup } from "react-hook-popup";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export function useAlert() {
  return usePopup("alert", ({ message, handleClose }) => (
    <Snackbar
      open
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  ));
}
