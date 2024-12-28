const summarizeLearningsPrompt = `
You receive some raw conversation information between an AI assistant and a candidate. You should summarize the information coming from the candidate in a way that creates stand-alone knowledge bits that can be stored for later consumption.
Keep the information as general-use as possible. For example if they share an interest in a specific company for a specific role, you can store the general knowledge (eg. open to mew roles, and open to the kind of role), with the specific opportunity as one example of specific interest.

# Examples:
## 1)
AI: Are you looking for a job now? I have a lot of roles open across Google
Candidate:  Yes. I'm interested, but I'm only looking for ML roles.
Your response: 'Currently looking for a job, but only in ML. Shared interest for Google'

## 2)
AI: Are you interested in a ML role at Google?
Candidate:  Yes
Your response: 'Showed interest in ML role at Google. Generalizing from there: they are looking for a new role, are interested in ML roles, and also like Google as a potential company.'
`;

export default summarizeLearningsPrompt;