import { useEffect, useState } from "react";
import { PROFILE_MEMORY_KEY } from "../utils/constants";

function ProfileData({ setIsModalOpen }) {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    const fetchProfileData = () => {
      try {
        chrome.storage.local.get(PROFILE_MEMORY_KEY, (result) => {
          const profileData = result[PROFILE_MEMORY_KEY] || "";
          setProfileData(profileData);
        });
      } catch (error) {
        console.error("Error retrieving profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  const handleModalSubmit = async () => {
    await chrome.storage.local.set({ [PROFILE_MEMORY_KEY]: profileData });
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <h3>Update Profile</h3>
        <textarea
          value={profileData}
          onChange={(e) => setProfileData(e.target.value)}
          style={{ width: "100%", height: "100px" }}
        />
        <button onClick={handleModalSubmit} style={{ marginTop: "10px" }}>
          Save
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 999,
        }}
        onClick={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ProfileData;
