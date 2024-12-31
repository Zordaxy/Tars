function showModal(title, contentText, callback) {
  if (!callback) return;

  window.openDialog?.(title, contentText);
  window.onDialogSubmit = callback;
}

export default showModal;