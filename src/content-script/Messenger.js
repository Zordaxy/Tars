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
    this.messages = parseLinkedInChat();
    console.log("Bot pulse. Nunber of messages: ", this.messages.length);

    if (this.messages.length > this.currentMessageCount) {
      const newMessage = `There is ${this.messages.length -
        this.currentMessageCount} new message(s). Response to: ${this.messages[
        this.messages.length - 1
      ]?.text.trim()}`;
      this.currentMessageCount = this.messages.length;

      // Replace with handleMessages that is commented out below
      updateChatInput(newMessage);
      triggerMessage();

      handleMessages(this.messages, this.sendResponse);
    }
  }
}
