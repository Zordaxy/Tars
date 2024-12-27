import React, { useState, useEffect } from "react";
import { sendMessageToContentScript } from "../utils/chromeHelper";
import ProfileData from "./ProfileData";
import NavBar from "./NavBar";

function App() {
  const [aiResponse, setAiResponse] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "AI_RESPONSE") {
      console.log(message?.input);
      alert(message?.input);
    }
  });

  useEffect(() => {
    if (!started) return;

    const fetchAndAnalyzeMessages = async () => {
      setLoading(true);

      try {
        const response = await sendMessageToContentScript("PARSE_CHAT");
        setAiResponse(response?.gptResponse || "");
        setLoading(false);
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
    <div style={{ width: "300px", padding: "10px", minHeight: "180px" }}>
      <h2>TARS (LinkedIn candidate screening chat bot)</h2>

      <NavBar
        setStarted={setStarted}
        setIsModalOpen={setIsModalOpen}
        loading={loading}
      />

      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#e6ffe6",
          borderRadius: "5px",
          whiteSpace: "pre-wrap",
        }}
      >
        {aiResponse}
      </div>

      {isModalOpen && <ProfileData setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}

export default App;
