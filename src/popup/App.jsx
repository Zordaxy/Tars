import React, { useState, useEffect } from "react";
import { sendMessageToContentScript } from "../utils/chromeHelper";
import NavBar from "./components/NavBar";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Status, { STATUSES } from "./components/Status";

export const PopupSection = styled.div`
  padding: 0 20px;
`;

/**
 * Popup component
 * Starts/spops bot and defines basic settings.
 * All the main logic happens in content script.
 */
function App() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [immediateAnswer, setImmediateAnswer] = useState(false);
  const [status, setStatus] = useState(STATUSES.NOT_STARTED);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "AI_RESPONSE") {
      alert(message?.input);
    }
  });

  const Popup = styled.div`
    width: 250px;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    font-family: "Roboto", sans-serif;
    padding: 2px;
  `;

  const StyledCheckbox = styled(PopupSection)`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
  `;

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

  useEffect(() => {
    checkStatus();
  }, []);

  /**
   * Checks status of the bot: NOT_STARTED, RUNNING, STOPPED
   */
  async function checkStatus() {
    const response = await sendMessageToContentScript("CHECK_STATUS");
    setStatus(response?.status);
  }

  /**
   * Starts bot
   */
  async function startBot() {
    setLoading(true);

    try {
      const response = await sendMessageToContentScript("PARSE_CHAT");
      setLoading(false);
      checkStatus();
    } catch (error) {
      setLoading(false);
    }
  }

  /**
   * Stops bot
   */
  function stopBot() {
    sendMessageToContentScript("STOP_CHAT");
    checkStatus();
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
    <Popup>
      <Header />
      <Divider />
      <PopupSection>
        <Wrapper>
          <Logo />
          <NavBar
            startBot={startBot}
            stopBot={stopBot}
            setIsModalOpen={setIsModalOpen}
            loading={loading}
            status={status}
          />
        </Wrapper>
      </PopupSection>
      <Divider />
      <StyledCheckbox>
        <FormControlLabel
          control={
            <Checkbox
              checked={immediateAnswer}
              onChange={handleAnswerCheckbox}
            />
          }
          label="Respond instantly"
        />
      </StyledCheckbox>
      {/* <Status status={status}></Status> */}
    </Popup>
  );
}

export default App;
