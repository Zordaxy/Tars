function updateChatInput(message) {
  const inputElement = document.querySelectorAll(
    ".msg-form__contenteditable "
  )[0];
  if (!inputElement) {
    console.error("Could not find chat input");
    return;
  }

  inputElement.innerHTML = `<p>${message}</p>`;

  // Remove placeholder text
  document
    .querySelector(".msg-form__placeholder")
    ?.classList?.remove("msg-form__placeholder");
}

export default updateChatInput;
