import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    console.log("started");
    debugger;

    // Request chat messages from content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "PARSE_CHAT" },
          (response) => {
            if (response && response.messages) {
              setMessages(response.messages);
            }
          }
        );
      }
    });

    // Listen for AI responses
    const responseListener = (request) => {
      if (request.type === "CHAT_PARSED") {
        console.log("response", request.response);
        setAiResponse(request.messages);
      }
    };

    chrome.runtime.onMessage.addListener(responseListener);

    return () => {
      chrome.runtime.onMessage.removeListener(responseListener);
    };
  }, [started]);

  function handleStart() {
    setStarted(true);
    console.log("handle start");
  }

  return (
    <div style={{ width: "300px", padding: "10px" }}>
      <h2>TARS (LinkedIn candidate screening chat bot)</h2>
      <button onClick={() => handleStart()}>Start bot</button>
      <br />
      <ul>
        {aiResponse &&
          aiResponse.map((x) => (
            <li
              style={{
                marginTop: "10px",
                padding: "5px",
                backgroundColor: "#e6ffe6",
              }}
            >
              {x.text}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
