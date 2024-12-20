import { PROFILE_MEMORY_KEY, OPENAI_API_KEY } from "../utils/constants";

export async function callGPT4(messages) {
  let profileData;
  try {
    profileData = await new Promise((resolve, reject) => {
      chrome.storage.local.get(PROFILE_MEMORY_KEY, function(result) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result[PROFILE_MEMORY_KEY] || ""); // Default to empty string if not found
        }
      });
    });
  }
  catch (error) {
    console.error("Error retrieving profile data:", error);
    profileData = "";
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant responding to LinkedIn messages on behalf of a the person receiving a certain LinkedIn message.'
                + `Answer any messages concisely, politely, and in a friendly tone. Use this profile data to help formulate your answers: ${profileData}`
          },
          {
            role: 'user',
            content: messages.map(m => m.text).join('\n')
          }
        ]
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}