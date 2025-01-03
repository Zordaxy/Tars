export async function apiRequest(prompt, content) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("openAiKey")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0,
        messages: [
          {
            role: "system",
            content: prompt,
          },
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.choices?.[0]?.message?.content.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}
