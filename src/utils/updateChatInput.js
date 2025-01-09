function updateChatInput(message) {
  const inputElement = document.querySelectorAll(
    ".msg-form__contenteditable "
  )[0];
  if (!inputElement) {
    console.error("Could not find chat input");
    return;
  }

  const formattedMessage = message.replace(/\n/g, '<br>');
  inputElement.innerHTML = `<p>${formattedMessage}</p>`;

  // Remove placeholder text
  document
    .querySelector(".msg-form__placeholder")
    ?.classList?.remove("msg-form__placeholder");

  const event = new Event("input", { bubbles: true, cancelable: true });
  inputElement.dispatchEvent(event);
}

export default updateChatInput;
