// Add this to utils/prompts.ts

export const suggestGenrePrompt = (story: string): string => {
  return `
You are a literary analyst with deep knowledge of genres and subgenres. Your task is to analyze the provided story and suggest the most fitting genre.

**Instructions:**
1.  Read the story carefully, paying attention to its plot, setting, tone, and themes.
2.  Determine the primary genre and a potential subgenre.
3.  Provide a brief, one-sentence justification for your choice.
4.  **Format your response as a single, valid JSON object.** Do not include any text before or after the JSON.

**JSON Schema:**
{
  "genre": "Suggested Primary Genre",
  "subgenre": "Suggested Subgenre",
  "justification": "A brief explanation of why this genre fits."
}

**Story:**
---
${story}
---

Now, provide the JSON response.
`;
};
