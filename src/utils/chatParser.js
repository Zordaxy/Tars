export function parseLinkedInChat() {
  const parsedMessages = document.querySelectorAll(
    ".msg-s-event-listitem__message-bubble--msg-fwd-enabled"
  );

  const markedMessages = Array.from(parsedMessages).map((message) => {
    return {
      text: message?.textContent?.trim(), // The message element itself
      author: message.closest(".msg-s-event-listitem--other")
        ? "recruiter"
        : "me", // Check for any ancestor with the selector
    };
  });

  const messages = markedMessages.map(
    (message) => `${message.author}: ${message.text}`
  );

  const recruiterMessageCount = [...markedMessages].filter(
    (message) => message.author === "recruiter"
  ).length;

  return { messages, recruiterMessageCount };
}
