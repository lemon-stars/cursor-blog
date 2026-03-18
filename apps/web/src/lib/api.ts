export type ApiPost = {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function listPosts(): Promise<ApiPost[]> {
  const res = await fetch(`${API_URL}/posts`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

export async function createPost(input: { title: string; content: string }): Promise<ApiPost> {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Failed to create post: ${res.status}`);
  return res.json();
}

