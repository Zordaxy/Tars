export const sendMessageToContentScript = (messageType, callback) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0 && tabs[0].id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: messageType },
        async (response) => {
          if (response) {
            callback(response);
          } else {
            console.error("Failed to receive messages from content script");
            callback(null);
          }
        }
      );
    }
  });
};
