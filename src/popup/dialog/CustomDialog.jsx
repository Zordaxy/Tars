import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DIALOG_TYPE, useDialog } from "../../content-script/dialogContext";
import FeedbackRequest from "./FeedbackRequest";
import InitialRequest from "./InitialRequest";
import saveInitialInfo from "../../utils/saveInitialInfo";

export default function CustomDialog() {
  const { open, dialogTitle, closeDialog, dialogType } = useDialog();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    if (window.onDialogSubmit) {
      if (dialogType === DIALOG_TYPE.INITIAL) {
        saveInitialInfo(formJson);
      }
    }

    const info = formJson.info;
    window.onDialogSubmit(info);
    window.onDialogSubmit = null;

    closeDialog();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={closeDialog}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {dialogType === DIALOG_TYPE.INITIAL && <InitialRequest />}
          {dialogType === DIALOG_TYPE.FEEDBACK && <FeedbackRequest />}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
