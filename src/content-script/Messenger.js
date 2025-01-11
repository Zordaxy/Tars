import { parseLinkedInChat } from "../utils/chatParser";
import triggerMessage from "../utils/triggerMessage";
import updateChatInput from "../utils/updateChatInput";
import handleMessages from "./handleMessages";

/**
 * Manages new messages and triggers AI handling.
 * All AI handling happens in "handleMessages" and "mainGPTcall" functions
 */
export default class Messenger {
  constructor(sendResponse) {
    this.messages = [];
    this.sendResponse = sendResponse;
    this.currentMessageCount = 0;
  }

  checkForMessage() {
    const { messages, recruiterMessageCount } = parseLinkedInChat();
    this.messages = messages;
    console.log("Bot pulse. Number of messages: ", recruiterMessageCount);

    if (recruiterMessageCount > this.currentMessageCount) {
      this.currentMessageCount = recruiterMessageCount;

      handleMessages(this.messages, (response) => {
        if (response.error) {
          console.error("Error handling GPT response:", response.error);
        } else {
          const { content } = response;
          updateChatInput(content);
          triggerMessage();
        }
      });
    }
  }
}
