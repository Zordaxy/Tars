import { parseLinkedInChat } from "../utils/chatParser.js";
import initContent from "./initContent.jsx";
import init from "./initContent.jsx";
import { callGPT4 } from "./openai.js";
import showModal from "../utils/showModal.js";
import updateChatInput from "../utils/updateChatInput.js";

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "PARSE_CHAT") {
    showModal(
      "Provide additional information that is not available in LinkedIn profile",
      (input) => {
        console.log("User input inside content script:", input);

        // Call AI to handle user input.
        // Then update chat input:
        updateChatInput(input);
      }
    );

    console.log("PARSE_CHAT");
    const messages = parseLinkedInChat();

    init();
    if (messages) {
      callGPT4(messages).then((gptResponse) => sendResponse({ gptResponse }));
    } else {
      console.log("Message is empty");
    }
  }
  return true;
});

// Initialize React on page
initContent();
