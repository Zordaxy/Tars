import mainPrompt from "../prompts/mainPrompt.js";
import summarizeLearningsPrompt from "../prompts/summarizeLearningsPrompt.js";
import { apiRequest } from "../utils/apiRequest";
import PersonalData from "../data/PersonalData";

export async function mainGPTcall(messages, info) {
  try {
    // Retrieve answers from localStorage
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
    const answersText = answers.map(answer => `${answer.id}: ${answer.answer}`).join("\n");
    const linkedinProfile = localStorage.getItem(PersonalData.questions.find(q => q.id === "liProfile").id) || "";

    // Concatenate info with answers
    const combinedInfo = `${answersText}\n${info}\n${linkedinProfile}`;

    const userMessages = messages.map((m) => m.text).join("\n");
    const prompt = mainPrompt(combinedInfo, userMessages);
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