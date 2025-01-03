import { DIALOG_TYPE } from "../content-script/dialogContext";

function showModal(title, contentText, callback, type = DIALOG_TYPE.FEEDBACK) {
  if (!callback) return;

  window.openDialog?.(type, title, contentText);
  window.onDialogSubmit = callback;
}

export default showModal;
