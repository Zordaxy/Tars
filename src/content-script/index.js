import initContent from "./initContent.jsx";
import init from "./initContent.jsx";
import {
  gatherInitialInfo,
  gatherInitialQuestions,
} from "./gatherInitialInfo.jsx";
import Messenger from "./Messenger.js";
import { STATUSES } from "../popup/components/Status.jsx";

let timer = null;
let initialLoad = true;

/**
 * Listens from messages from the popup
 * AI handling happens in "handleMessages" and "mainGPTcall" functions
 */
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "PARSE_CHAT") {
    init();
    await gatherInitialInfo();
    await gatherInitialQuestions();

    const messenger = new Messenger(sendResponse);
    if (!timer) {
      console.log("Bot started");
      timer = setInterval(() => messenger.checkForMessage(), 4000);
      initialLoad = false;
    }
  }

  if (request.type === "STOP_CHAT") {
    if (timer) {
      console.log("Bot stopped");
      clearInterval(timer);
      timer = null;
      initialLoad = false;
    }
  }

  if (request.type === "READ_STORAGE") {
    const value = localStorage.getItem(request.data);
    sendResponse({ value });
  }

  if (request.type === "UPDATE_STORAGE") {
    Object.entries(request.data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  if (request.type === "CHECK_STATUS") {
    let status = STATUSES.NOT_STARTED;

    if (timer) {
      status = STATUSES.RUNNING;
    } else if (!initialLoad) {
      status = STATUSES.STOPPPED;
    }
    console.log(status);
    sendResponse({ status });
  }

  return true;
});

// Initialize React on page
initContent();
