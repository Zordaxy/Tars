import React, { useState, useEffect } from "react";
import { callGPT4 } from "../content-script/openai";

function App() {
  const [messages, setMessages] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!started) return;

    const fetchAndAnalyzeMessages = async () => {
      setLoading(true);

      try {
        // Request chat messages from content script
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
          if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { type: "PARSE_CHAT" },
                async (response) => {
                  if (response && response.messages) {
                    setMessages(response.messages);
                    try {
                      const gptResponse = await callGPT4(response.messages);
                      setAiResponse(gptResponse);
                    } catch (error) {
                      setAiResponse(`Error: ${error.message}`);
                    }
                  }
                  setLoading(false);
                }
            );
          }
        });
      } catch (error) {
        setAiResponse(`Error: ${error.message}`);
        setLoading(false);
      }
    };

    fetchAndAnalyzeMessages();
    const interval = setInterval(fetchAndAnalyzeMessages, 5000);

    return () => clearInterval(interval);
  }, [started]);

  return (
      <div style={{ width: "300px", padding: "10px" }}>
        <h2>TARS (LinkedIn candidate screening chat bot)</h2>
        <button
            onClick={() => setStarted(true)}
            disabled={loading}
            style={{ marginBottom: "10px" }}
        >
          {loading ? 'Processing...' : 'Start bot'}
        </button>
        <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#e6ffe6",
              borderRadius: "5px",
              whiteSpace: "pre-wrap"
            }}
        >
          {aiResponse}
        </div>
      </div>
  );
}

export default App;