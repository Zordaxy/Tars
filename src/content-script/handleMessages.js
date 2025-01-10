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
    const info = localStorage.getItem("info") || "";
    handleGPTResponse(messages, info, sendResponse).catch((error) => {
      console.error("Error handling GPT response:", error);
      sendResponse({ error: error.message });
    });
  } else {
    console.log("Message is empty");
    sendResponse({ error: "Message is empty" });
  }
}

/**
 * Main GPT response handling function
 * @param {*} messages
 * @param {*} info
 * @param {*} sendResponse
 */
async function handleGPTResponse(messages, info, sendResponse) {
  console.log("handleGPTResponse triggered");

  const { keyword, content } = await mainGPTcall(messages, info);
  let title = "Message from TARS";
  if (
      keyword === "ASK_TO_UPDATE_CANDIDATE_PROFILE" ||
      keyword === "ASK_PRIVATE_CANDIDATE_INFO"
  ) {
    title = "Provide Additional Information";
    showModal(title, content, async (input) => {
      const processedText = await summarizeLearnings(
          "AI: " + content + "Candidate:" + input
      );
      const updatedInfo = info + ";\n" + processedText;
      localStorage.setItem("info", updatedInfo);
      handleGPTResponse(messages, updatedInfo, sendResponse);
    });
  } else {
    updateChatInput(content);
    triggerMessage();
    sendResponse({ keyword, content });

  }
}