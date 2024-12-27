function showModal(title, header, callback) {
  if (!callback) return;

  window.openDialog?.(title, header);
  window.onDialogSubmit = callback;
}

export default showModal;