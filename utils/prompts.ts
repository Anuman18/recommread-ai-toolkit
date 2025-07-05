// utils/prompts.ts

export const generateStoryPrompt = (
  topic: string,
  genre: string,
  tone: string
): string => {
  return `
You are an expert storyteller. Your task is to write a compelling short story based on the user's request.

**Instructions:**
1.  **Topic:** Write a story about: "${topic}".
2.  **Genre:** The story must be in the **${genre}** genre.
3.  **Tone:** The tone of the story should be **${tone}**.
4.  **Length:** The story should be between 400 and 600 words.
5.  **Format:** The output should be a single block of text, without any titles, headings, or markdown formatting other than paragraphs. Start the story directly.
6.  **Content:** Ensure the story has a clear beginning, middle, and end. Develop at least one interesting character.

Begin the story now.
`;
};