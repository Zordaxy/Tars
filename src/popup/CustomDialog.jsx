import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDialog } from "../content-script/dialogContext";

export default function CustomDialog() {
  const { open, dialogHeader, closeDialog } = useDialog();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const info = formJson.info;

    if (window.onDialogSubmit) {
      window.onDialogSubmit(info);
      window.onDialogSubmit = null;
    }
    closeDialog();
  };

  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& input": {
      boxShadow: "none !important",
      outlineWidth: "0 !important",
    },
    "& textarea": {
      boxShadow: "none !important",
      outlineWidth: "0 !important",
    },
  }));

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
        <DialogTitle>Message from your chat bot</DialogTitle>
        <DialogContent>
          <DialogContentText> {dialogHeader}</DialogContentText>
          <CustomTextField
            autoFocus
            required
            margin="dense"
            id="info"
            name="info"
            label="Additional Info"
            fullWidth
            variant="standard"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
