
// app/api/analyze-tone/route.ts

import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { analyzeTonePrompt } from '@/utils/prompts';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { story } = await request.json();
  if (!story) {
    return NextResponse.json({ error: 'Story content is required' }, { status: 400 });
  }

  try {
    const prompt = analyzeTonePrompt(story);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
          }
        }),
      }
    );

    if (!res.ok) throw new Error(`Gemini API failed with status ${res.status}`);
    
    const data = await res.json();
    const generatedContent = data.candidates[0].content.parts[0].text;
    
    return NextResponse.json({ content: JSON.parse(generatedContent) });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || 'Failed to analyze tone' }, { status: 500 });
  }
}
