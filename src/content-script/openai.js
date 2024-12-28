import { PROFILE_MEMORY_KEY } from "../utils/constants";
import mainPrompt from "../prompts/mainPrompt.js";
import summarizeLearningsPrompt from "../prompts/summarizeLearningsPrompt.js";
import { apiRequest } from "../utils/apiRequest";

export async function mainGPTcall(messages, profileData) {
  try {
    const userMessages = messages.map((m) => m.text).join("\n");
    const prompt = mainPrompt(profileData, userMessages);
    const rawResponse = await apiRequest(prompt, "");
    const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();
    try {
      const gptMessage = JSON.parse(cleanedResponse);
      return { keyword: gptMessage.keyword, content: gptMessage.content };
    } catch (parseError) {
      console.error("Failed to parse JSON response:", cleanedResponse);
      throw new Error(`Failed to parse JSON response: ${cleanedResponse}`);
    }
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

export async function summarizeLearnings(rawText) {
  try {
    const prompt = summarizeLearningsPrompt;
    return await apiRequest(prompt, rawText);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}