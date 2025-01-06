import React, { useState, useEffect } from "react";
import { sendMessageToContentScript } from "../utils/chromeHelper";
import ProfileData from "./ProfileData";
import NavBar from "./NavBar";
import { Checkbox, FormControlLabel } from "@mui/material";

function App() {
  const [aiResponse, setAiResponse] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [immediateAnswer, setImmediateAnswer] = useState(false);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "AI_RESPONSE") {
      alert(message?.input);
    }
  });

  useEffect(() => {
    const x = localStorage.getItem("immediateAnswer");
    setImmediateAnswer(x === "true");
  }, []);

  useEffect(() => {
    if (!started) return;

    const fetchAndAnalyzeMessages = async () => {
      setLoading(true);

      try {
        const response = await sendMessageToContentScript("PARSE_CHAT");
        if (response.error) {
          setAiResponse(`Error: ${response.error}`);
        } else {
          setAiResponse(response?.gptResponse || "");
        }
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

  const handleAnswerCheckbox = (event) => {
    setImmediateAnswer(event.target.checked);
    localStorage.setItem("immediateAnswer", event.target.checked);
  };
  return (
    <div style={{ width: "300px", padding: "10px", minHeight: "180px" }}>
      <h2>TARS (LinkedIn candidate screening chat bot)</h2>

      <NavBar
        setStarted={setStarted}
        setIsModalOpen={setIsModalOpen}
        loading={loading}
      />
      <FormControlLabel
        control={
          <Checkbox checked={immediateAnswer} onChange={handleAnswerCheckbox} />
        }
        label="Answer instantly"
      />
      {/* 
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

        {isModalOpen && <ProfileData setIsModalOpen={setIsModalOpen} />} */}
    </div>
  );
}

export default App;
