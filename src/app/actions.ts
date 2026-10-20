'use server';

import { getRelatedPosts } from '@/lib/linking';
import { processContactSubmission, type ContactResult } from '@/lib/server/contact';

export type State = ContactResult;

export async function submitContactForm(prevState: State, formData: FormData): Promise<State> {
  const rawInput = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    company: formData.get('company'),
    turnstileToken: formData.get('cf-turnstile-response'),
  };

  const result = await processContactSubmission(rawInput);
  if (result.success) return result;

  // React resets uncontrolled forms after an action, so echo the input back
  // to restore it via defaultValue and spare the visitor from retyping.
  const text = (value: FormDataEntryValue | null) => (typeof value === 'string' ? value : '');
  return {
    ...result,
    fields: { name: text(rawInput.name), email: text(rawInput.email), message: text(rawInput.message) },
  };
}

export async function getRelatedPostsAction(currentId: string) {
    try {
        const posts = await getRelatedPosts(currentId);
        return posts;
    } catch (error) {
        console.error("Error fetching related posts:", error);
        return [];
    }
}
