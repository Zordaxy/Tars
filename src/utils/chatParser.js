export function parseLinkedInChat() {
  const messages = document.querySelectorAll(
    ".msg-s-event-listitem__message-bubble--msg-fwd-enabled"
  );

  const markedMessages = Array.from(messages)
    .map((message) => {
      return {
        text: message?.textContent?.trim(), // The message element itself
        owner: message.closest(".msg-s-event-listitem--other")
          ? "recruiter"
          : "me", // Check for any ancestor with the selector
      };
    })
    .map((message) => `${message.owner}: ${message.text}`);

  return markedMessages;
}
