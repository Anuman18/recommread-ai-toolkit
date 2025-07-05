// lib/types.ts
export type Story = {
  id: string;
  created_at: string;
  title: string | null;
  content: string | null;
  genre: string | null;
  // We can add the 'analysis' field later if needed
};
