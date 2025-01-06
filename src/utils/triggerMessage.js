export default function triggerMessage() {
  setTimeout(() => {
    const sendButton = document.querySelector("button.msg-form__send-button");
    if (sendButton && !sendButton.disabled) {
      sendButton.click();
    } else {
      console.error("Failed to send message");
    }
  }, 500);
}
