import { PROFILE_MEMORY_KEY, OPENAI_API_KEY } from "../utils/constants";

export async function callGPT4(messages) {
  try {
    const storageData = await chrome.storage.local.get(PROFILE_MEMORY_KEY);
    const profileData = storageData?.[PROFILE_MEMORY_KEY] || "";
    const content =
        "You are a helpful assistant responding to a LinkedIn message from a recruiter on behalf of a the person (candidate) receiving a certain LinkedIn message. " +
        "Answer any messages concisely, politely, and in a friendly tone. " +
        "IMPORTANT: You must ALWAYS respond in this exact JSON format:\n" +
        "{\n" +
        '  "keyword": "SEND_RESPONSE",  // Use one of: SEND_RESPONSE, REVIEW_DRAFTED_RESPONSE, ASK_PRIVATE_CANDIDATE_INFO, ASK_TO_UPDATE_CANDIDATE_PROFILE\n' +
        '  "content": "Your actual message here"\n' +
        "}\n\n" +
        "Follow this logic when picking the keyword:" +
        " - SEND_RESPONSE if the information you have available in the profile_data has ALL you need to confidently answer the message without using any other data or assumption. " +
        "   If you choose this keyword, then the 'content' should be the message to send out. NEVER make assumptions of any kind or use information that is not in the profile_data when crafting your responses.\n" +
        " - REVIEW_DRAFTED_RESPONSE if the information you have available in the profile_data has probably all you need to answer the message without using any other data or assumption " +
        "   but you're not sure so the user should still review the message before sending it out. If you choose this keyword, then the 'content' should be the message to review and send out.\n" +
        " - ASK_PRIVATE_CANDIDATE_INFO if the information you have available in the profile_data ALONE does not have all you need to confidently answer the message." +
        "   without making any other assumptions and the information that is missing is something that you think the user can share privately with you. " +
        "   If you choose this keyword, then the 'content' should be the question to ask the user (and not the response to the message).\n" +
        " - ASK_TO_UPDATE_CANDIDATE_PROFILE if the information you have available in the profile_data does not have all you need to confidently answer the message " +
        "   and the information that is missing is something that you think the user should add to their LinkedIn profile. " +
        "   If you choose this keyword, then the 'content' should be the question to ask the user (and not the response to the message).\n" +
        "Important rules: \n" +
        " - When in doubt, it's better to ask the user to provide more info (eg. ASK_PRIVATE_CANDIDATE_INFO) or to double check your answer (REVIEW_DRAFTED_RESPONSE)" +
        " - Never decline to learn more about an opportunity unless you have explicit instructions to do so." +
        "Use this profile_data on the user to help formulate your answers: " +
        `${profileData}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0,
        messages: [
          {
            role: "system",
            content,
          },
          {
            role: "user",
            content: messages.map((m) => m.text).join("\n"),
          },
        ],
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}
