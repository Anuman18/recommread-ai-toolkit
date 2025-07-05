# 🔥 RecommRead AI Toolkit

RecommRead is a full-stack web application that provides AI-powered tools for story writers to help them write, edit, analyze, and polish their short stories. This project was built step-by-step using Next.js, Supabase, and the Google Gemini API.

**Live Demo:** [Link to your Vercel deployment]

---

## 🎯 Features (MVP)

* **AI Story Generator:** Generate story content based on a user prompt, genre, and tone.
* **Title & Tagline Generator:** Generate 5 creative titles and 3 taglines for a given story.
* **Genre Suggestion Tool:** Detect the best-suited genre from a user-submitted story.
* **Tone Analyzer:** Analyze and explain the emotional tone of a story with percentage scores.
* **Story Rewriter:** Rewrite a story to make it more emotional, engaging, shorter, or grammatically improved.
* **User Authentication:** Secure sign-up and login for users.
* **Saved Stories Database:** Users can save, view, and manage their generated content.
* **Dark/Light Mode:** A sleek theme toggle for user preference.

---

## ⚙️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (with App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Authentication & DB:** [Supabase](https://supabase.io/) (Auth & PostgreSQL)
* **LLM:** [Google Gemini API](https://ai.google.dev/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A Supabase account
* A Google AI API Key for Gemini

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/recommread-ai-toolkit.git](https://github.com/YOUR_USERNAME/recommread-ai-toolkit.git)
    cd recommread-ai-toolkit
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the following variables:
    ```
    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

    # Gemini
    GEMINI_API_KEY=your-gemini-api-key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
