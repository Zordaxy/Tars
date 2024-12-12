import { parseLinkedInChat } from "../utils/chatParser.js";

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "PARSE_CHAT") {
    console.log("PARSE_CHAT");
    const messages = parseLinkedInChat();
    sendResponse({ messages });
    return true;
  }
});

// Utility function to send parsed messages
function sendParsedMessages() {
  console.log("send PARSE_CHAT");
  const messages = parseLinkedInChat();
  chrome.runtime.sendMessage({
    type: "CHAT_PARSED",
    messages,
  });
}

// Periodic message parsing
setInterval(sendParsedMessages, 5000);
