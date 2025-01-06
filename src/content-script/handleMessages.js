import { PROFILE_MEMORY_KEY } from "../utils/constants";
import showModal from "../utils/showModal";
import triggerMessage from "../utils/triggerMessage";
import updateChatInput from "../utils/updateChatInput";
import { mainGPTcall, summarizeLearnings } from "./openai";

/**
 * Prepares data and triggers handleGPTResponse - main IA handling function
 * @param {*} messages
 * @param {*} sendResponse
 */
export default function handleMessages(messages, sendResponse) {
  if (messages) {
    chrome.storage.local.get(PROFILE_MEMORY_KEY, (result) => {
      const profileData = result?.[PROFILE_MEMORY_KEY] || "";
      handleGPTResponse(messages, profileData, sendResponse).catch((error) => {
        console.error("Error handling GPT response:", error);
        sendResponse({ error: error.message });
      });
    });
  } else {
    console.log("Message is empty");
    sendResponse({ error: "Message is empty" });
  }
}

/**
 * Main GPT response handling function
 * @param {*} messages
 * @param {*} profileData
 * @param {*} sendResponse
 */
async function handleGPTResponse(messages, profileData, sendResponse) {
  console.log("handleGPTResponse triggered");

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
      ``;
      handleGPTResponse(messages, updatedProfileData, sendResponse);
    });
  } else if (
    keyword === "REVIEW_DRAFTED_RESPONSE" ||
    keyword === "SEND_RESPONSE"
  ) {
    title = "Review the Response";
    showModal(title, content, (input) => {
      updateChatInput(input);
      triggerMessage();
    });
  }
  sendResponse({ keyword, content });
}
