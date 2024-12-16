const OPENAI_API_KEY = "write_your_openai_api_key_here";

export async function callGPT4(messages) {
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
            content: 'You are a helpful assistant resonding to LinkedIn messages on behalf of a the person receiving a certain LinkedIn message.'
                + 'Answer any messages concisely, politely, and in a friendly tone.'
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
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}