import { DialogContentText } from "@mui/material";
import { useDialog } from "../../content-script/dialogContext";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

export default function FeedbackRequest() {
  const { dialogHeader } = useDialog();

  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& input": {
      boxShadow: "none !important",
      outlineWidth: "0 !important",
    },
    "& textarea": {
      boxShadow: "none !important",
      outlineWidth: "0 !important",
    },
    "& label": {
      fontSize: "18px !important",
    },
  }));

  return (
    <>
      <DialogContentText> {dialogHeader}</DialogContentText>
      <CustomTextField
        autoFocus
        required
        margin="dense"
        id="info"
        name="info"
        fullWidth
        variant="standard"
        multiline
      />
    </>
  );
}
