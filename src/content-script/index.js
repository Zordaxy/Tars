import { parseLinkedInChat } from "../utils/chatParser.js";
import { callGPT4 } from "./openai.js";

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "PARSE_CHAT") {
    console.log("PARSE_CHAT");
    const messages = parseLinkedInChat();

    if (messages) {
      callGPT4(messages).then((gptResponse) => sendResponse({ gptResponse }));
    } else {
      console.log("Message is empty");
    }
  }
  return true;
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
