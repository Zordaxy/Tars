export default function triggerMessage() {
  const isEnabled = localStorage.getItem("immediateAnswer") === "true";

  if (isEnabled) {
    setTimeout(() => {
      const sendButton = document.querySelector("button.msg-form__send-button");
      if (sendButton && !sendButton.disabled) {
        sendButton.click();
      } else {
        console.error("Failed to send message");
      }
    }, 500);
  }
}
