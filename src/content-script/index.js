import { parseLinkedInChat } from "../utils/chatParser.js";
import initContent from "./initContent.jsx";
import init from "./initContent.jsx";
import { mainGPTcall, summarizeLearnings } from "./openai.js";
import showModal from "../utils/showModal.js";
import updateChatInput from "../utils/updateChatInput.js";
import { PROFILE_MEMORY_KEY } from "../utils/constants";
import gatherInitialInfo from "./gatherInitialInfo.jsx";

// Listen for messages from background script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "PARSE_CHAT") {
    const messages = parseLinkedInChat();

    init();

    await gatherInitialInfo();

    if (messages) {
      const handleGPTResponse = async (profileData) => {
        const { keyword, content } = await mainGPTcall(messages, profileData);
        let title = "Message from your chat bot";
        if (
          keyword === "ASK_TO_UPDATE_CANDIDATE_PROFILE" ||
          keyword === "ASK_PRIVATE_CANDIDATE_INFO"
        ) {
          title = "Provide Additional Information";
          showModal(title, content, async (input) => {
            const processedText = await summarizeLearnings(
              "AI: " + content + "Candidate:" + input
            );
            const updatedProfileData = profileData + "\n" + processedText;
            await chrome.storage.local.set({
              [PROFILE_MEMORY_KEY]: updatedProfileData,
            });
            handleGPTResponse(updatedProfileData);
          });
        } else if (
          keyword === "REVIEW_DRAFTED_RESPONSE" ||
          keyword === "SEND_RESPONSE"
        ) {
          title = "Review the Response";
          showModal(title, content, (input) => {
            updateChatInput(input);
          });
        }
        sendResponse({ keyword, content });
      };

      chrome.storage.local.get(PROFILE_MEMORY_KEY, (result) => {
        const profileData = result?.[PROFILE_MEMORY_KEY] || "";
        handleGPTResponse(profileData).catch((error) => {
          console.error("Error handling GPT response:", error);
          sendResponse({ error: error.message });
        });
      });
    } else {
      console.log("Message is empty");
      sendResponse({ error: "Message is empty" });
    }
  }
  return true;
});

// Initialize React on page
initContent();
