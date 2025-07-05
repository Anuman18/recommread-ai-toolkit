// utils/prompts.ts

// From Milestone 3
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

// From Milestone 4
export const generateTitleAndTaglinePrompt = (story: string): string => {
  return `
You are a creative expert in marketing and branding for literature. Your task is to generate compelling titles and taglines for the provided story.

**Instructions:**
1.  Read the following story carefully.
2.  Generate 5 unique and creative titles for the story.
3.  Generate 3 unique and catchy taglines that capture the essence of the story.
4.  **Crucially, format your response as a single, valid JSON object.** Do not include any text or markdown before or after the JSON object.

**JSON Schema:**
{
  "titles": [
    {"title": "First Title"},
    {"title": "Second Title"},
    {"title": "Third Title"},
    {"title": "Fourth Title"},
    {"title": "Fifth Title"}
  ],
  "taglines": [
    {"tagline": "First Tagline"},
    {"tagline": "Second Tagline"},
    {"tagline": "Third Tagline"}
  ]
}

**Story:**
---
${story}
---

Now, provide the JSON response.
`;
};

// From Milestone 4
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

// From Milestone 6
export const rewriteStoryPrompt = (story: string, instruction: string): string => {
  return `
You are an expert editor and copywriter. Your task is to rewrite the provided story based on a specific instruction.

**Instruction:** ${instruction}.

**Rules:**
1.  Adhere strictly to the instruction.
2.  Do not add any commentary, headings, or titles.
3.  The output should be only the rewritten story text.
4.  Preserve the core plot and characters of the original story unless the instruction implies otherwise.

**Original Story:**
---
${story}
---

Begin the rewritten story now.
`;
};

// From Milestone 6
export const analyzeTonePrompt = (story: string): string => {
  return `
You are a sophisticated literary critic with a deep understanding of emotional tone. Your task is to analyze the provided story and identify its primary emotional tones.

**Instructions:**
1.  Read the story carefully.
2.  Identify the top 3-4 dominant emotional tones (e.g., Mysterious, Joyful, Tense, Melancholic).
3.  For each tone, provide a percentage score representing its prevalence in the story. The percentages should add up to 100.
4.  For each tone, provide a brief, one-sentence justification with a supporting quote from the text.
5.  **Format your response as a single, valid JSON object.** Do not include any text before or after the JSON.

**JSON Schema:**
{
  "tones": [
    {
      "tone": "Name of the first tone",
      "score": 45,
      "justification": "Justification with a quote."
    },
    {
      "tone": "Name of the second tone",
      "score": 35,
      "justification": "Justification with a quote."
    },
    {
      "tone": "Name of the third tone",
      "score": 20,
      "justification": "Justification with a quote."
    }
  ]
}

**Story:**
---
${story}
---

Now, provide the JSON response.
`;
};
