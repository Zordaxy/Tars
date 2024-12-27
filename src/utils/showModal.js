function showModal(header, callback) {
  if (!callback) return;

  window.openDialog?.(header);
  window.onDialogSubmit = callback;
}

export default showModal;
