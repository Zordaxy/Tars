export const sendMessageToContentScript = (messageType, data) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: messageType, data: data },
          async (response) => {
            if (chrome.runtime.lastError) {
              console.error(
                "Error sending message to content script:",
                chrome.runtime.lastError?.message
              );
              reject(
                new Error(
                  `Failed to send message to content script: ${chrome.runtime.lastError?.message}`
                )
              );
            } else {
              console.log("Received response:", response);
              resolve(response);
            }
          }
        );
      } else {
        reject(new Error("No active tab found"));
      }
    });
  });
};
