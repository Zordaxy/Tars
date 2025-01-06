import React, { useState, useEffect } from "react";
import { sendMessageToContentScript } from "../utils/chromeHelper";
import NavBar from "./NavBar";
import { Checkbox, FormControlLabel } from "@mui/material";

/**
 * Popup component
 * Starts/spops bot and defines basic settings.
 * All the main logic happens in content script.
 */
function App() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [immediateAnswer, setImmediateAnswer] = useState(false);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "AI_RESPONSE") {
      alert(message?.input);
    }
  });

  useEffect(() => {
    const getImmediateAnswer = async () => {
      const x = await sendMessageToContentScript(
        "READ_STORAGE",
        "immediateAnswer"
      );
      setImmediateAnswer(x?.value === "true");
    };

    getImmediateAnswer();
  }, []);

  /**
   * Starts bot
   */
  async function startBot() {
    setLoading(true);

    try {
      const response = await sendMessageToContentScript("PARSE_CHAT");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  /**
   * Stops bot
   */
  function stopBot() {
    sendMessageToContentScript("STOP_CHAT");
  }

  /**
   * Handle checkbox change that defines if bot should answer instantly
   * @param {*} event
   */
  const handleAnswerCheckbox = (event) => {
    setImmediateAnswer(event.target.checked);
    const x = sendMessageToContentScript("UPDATE_STORAGE", {
      immediateAnswer: event.target.checked,
    });
  };

  return (
    <div style={{ width: "300px", padding: "10px", minHeight: "180px" }}>
      <h2>TARS (Digital Double for Screening)</h2>

      <NavBar
        startBot={startBot}
        stopBot={stopBot}
        setIsModalOpen={setIsModalOpen}
        loading={loading}
      />
      <FormControlLabel
        control={
          <Checkbox checked={immediateAnswer} onChange={handleAnswerCheckbox} />
        }
        label="Answer instantly"
      />
    </div>
  );
}

export default App;
