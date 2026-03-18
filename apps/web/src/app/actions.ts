'use server';

import { revalidatePath } from 'next/cache';
import { createPost } from '@/lib/api';

export async function createPostAction(formData: FormData): Promise<void> {
  const title = String(formData.get('title') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();

  if (!title || !content) {
    return;
  }

  await createPost({ title, content });
  revalidatePath('/');
}

