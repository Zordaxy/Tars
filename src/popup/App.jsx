import React, { useState, useEffect } from "react";
import { callGPT4 } from "../content-script/openai";
import { PROFILE_MEMORY_KEY } from "../utils/constants";

function App() {
  const [messages, setMessages] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveProfile, setSaveProfile] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState("");

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

  useEffect(() => {
    if (!saveProfile) return;

    console.log("Save profile effect called");
    const saveProfileToStorage = async () => {
      try {
        await chrome.storage.local.set({ [PROFILE_MEMORY_KEY]: profileData });
        console.log("Profile data saved successfully");
        try {
          chrome.storage.local.get(PROFILE_MEMORY_KEY, (result) => {
            if (result[PROFILE_MEMORY_KEY]) {
              console.log("Profile data retrieved successfully:", result[PROFILE_MEMORY_KEY]);
            }
          });
        } catch (error) {
          console.error("Error retrieving profile data:", error);
          setAiResponse(`Error retrieving profile data: ${error.message}`);
        }
      } catch (error) {
        console.error("Error saving profile data:", error);
        setAiResponse(`Error saving profile data: ${error.message}`);
      }
    };

    saveProfileToStorage();
    setSaveProfile(false);
  }, [saveProfile, profileData]);

  const handleUpdateProfile = () => {
    console.log("Update profile handler called");
    const fetchProfileData = () => {
      try {
        setModalInput("")
        console.log("Fetching profile data to pre-fill modal input");
        chrome.storage.local.get(PROFILE_MEMORY_KEY, (result) => {
          if (chrome.runtime.lastError) {
            console.error("Error retrieving profile data:", chrome.runtime.lastError);
            setAiResponse(`Error retrieving profile data: ${chrome.runtime.lastError.message}`);
            return;
          }
          if (result[PROFILE_MEMORY_KEY]) {
            console.log("Profile data retrieved successfully:", result[PROFILE_MEMORY_KEY], "Setting modal input.");
            setModalInput(result[PROFILE_MEMORY_KEY]);
          } else {
            console.log("No profile data found.", result);
          }
        });
      } catch (error) {
        console.error("Error retrieving profile data:", error);
        setAiResponse(`Error retrieving profile data: ${error.message}`);
      }
    }
    fetchProfileData();
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    setProfileData(modalInput);
    setSaveProfile(true);
    setIsModalOpen(false);
  };

  return (<div style={{width: "300px", padding: "10px"}}>
    <h2>TARS (LinkedIn candidate screening chat bot)</h2>
    <button
        onClick={() => setStarted(true)}
        disabled={loading}
        style={{marginBottom: "10px"}}
    >
      {loading ? 'Processing...' : 'Start bot'}
    </button>
    <button
        onClick={handleUpdateProfile}
        style={{marginBottom: "10px", marginLeft: "10px"}}
    >
      Add/Update profile
    </button>
    <button
        onClick={() => setStarted(false)}
        style={{marginBottom: "10px", marginLeft: "10px"}}
    >
      Stop bot
    </button>
    <div
        style={{
          marginTop: "10px", padding: "10px", backgroundColor: "#e6ffe6", borderRadius: "5px", whiteSpace: "pre-wrap"
        }}
    >
      {aiResponse}
    </div>

    {isModalOpen && (<div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          zIndex: 1000
        }}>
          <h3>Update Profile</h3>
          <textarea
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              style={{width: "100%", height: "100px"}}
          />
          <button onClick={handleModalSubmit} style={{marginTop: "10px"}}>
            Save
          </button>
          <button onClick={() => setIsModalOpen(false)} style={{marginTop: "10px", marginLeft: "10px"}}>
            Cancel
          </button>
        </div>)}
    {isModalOpen && (<div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999
        }} onClick={() => setIsModalOpen(false)}/>)}
  </div>);
}

export default App;