export function parseLinkedInChat() {
  const chatMessages = document.querySelectorAll(
    ".msg-s-event-listitem--other .msg-s-event-listitem__message-bubble--msg-fwd-enabled"
  );
  console.log("messages:", chatMessages);
  return Array.from(chatMessages).map((message) => ({
    text: message.textContent || "",
  }));
}
