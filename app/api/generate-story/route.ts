// app/api/generate-story/route.ts

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateStoryPrompt } from '@/utils/prompts';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // 1. Check for authenticated user
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Parse request body
  const { topic, genre, tone } = await request.json();
  if (!topic || !genre || !tone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // 3. Call Gemini API
  try {
    const prompt = generateStoryPrompt(topic, genre, tone);
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
        const errorBody = await res.text();
        console.error("Gemini API Error:", errorBody);
        throw new Error(`Gemini API failed with status ${res.status}`);
    }

    const data = await res.json();
    
    if (!data.candidates || !data.candidates[0].content.parts[0].text) {
        throw new Error("Invalid response structure from Gemini API");
    }

    const story = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ story });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to generate story' }, { status: 500 });
  }
}
