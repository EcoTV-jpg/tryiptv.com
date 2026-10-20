import { z } from 'zod';
import { Resend } from 'resend';

export const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name cannot be blank.', invalid_type_error: 'Name cannot be blank.' })
    .trim()
    .min(1, 'Name cannot be blank.')
    .max(100, 'Name cannot exceed 100 characters.'),
  email: z
    .string({ required_error: 'Email is required.', invalid_type_error: 'Email is required.' })
    .trim()
    .min(1, 'Email is required.')
    .email('Invalid email address.')
    .max(255, 'Email cannot exceed 255 characters.'),
  message: z
    .string({ required_error: 'Message cannot be empty.', invalid_type_error: 'Message cannot be empty.' })
    .trim()
    .min(1, 'Message cannot be empty.')
    .max(5000, 'Message cannot exceed 5000 characters.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactResult = {
  success?: boolean;
  message?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    form?: string[];
  } | null;
  fields?: { name: string; email: string; message: string };
};

const GENERIC_FORM_ERROR = 'Something went wrong. Please try again.';

async function verifyTurnstileToken(token: unknown): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (typeof token !== 'string' || !token || !secret) {
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const result: unknown = await response.json();
    return Boolean(
      result &&
        typeof result === 'object' &&
        'success' in result &&
        result.success === true,
    );
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function processContactSubmission(rawInput: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
  turnstileToken?: unknown;
}): Promise<ContactResult> {
  const honeypot = typeof rawInput.company === 'string' ? rawInput.company.trim() : '';
  if (honeypot.length > 0) {
    return {
      success: true,
      message: "Message sent successfully. We'll get back to you as soon as possible.",
      errors: null,
    };
  }

  const validation = contactSchema.safeParse(rawInput);

  if (!validation.success) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, message } = validation.data;

  if (!(await verifyTurnstileToken(rawInput.turnstileToken))) {
    return {
      success: false,
      message: GENERIC_FORM_ERROR,
      errors: { form: [GENERIC_FORM_ERROR] },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not defined in the environment.');
    return {
      success: false,
      message: GENERIC_FORM_ERROR,
      errors: {
        form: [GENERIC_FORM_ERROR],
      },
    };
  }

  try {
    const resend = new Resend(apiKey);
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedMessage = escapeHtml(message).replace(/\r?\n/g, '<br>');
    const timestamp = new Date().toUTCString();

    const safeSubjectName = name.replace(/[\r\n]+/g, ' ').trim();
    const subject = safeSubjectName
      ? `TryIPTV Support — ${safeSubjectName}`
      : 'New TryIPTV Support Request';

    const html = `<h2>New TryIPTV Support Request</h2>

<p>
A new message was submitted through the TryIPTV contact page.
</p>

<table style="border-collapse: collapse; margin-bottom: 20px;">
  <tr>
    <td style="padding: 6px 16px 6px 0; vertical-align: top;"><strong>Name</strong></td>
    <td style="padding: 6px 0; vertical-align: top;">${escapedName}</td>
  </tr>
  <tr>
    <td style="padding: 6px 16px 6px 0; vertical-align: top;"><strong>Email</strong></td>
    <td style="padding: 6px 0; vertical-align: top;">${escapedEmail}</td>
  </tr>
</table>

<h3>Customer Message</h3>

<div style="margin-bottom: 20px; line-height: 1.5;">
${escapedMessage}
</div>

<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

<p style="font-size: 13px; color: #4b5563; line-height: 1.5;">
<strong>Source:</strong> TryIPTV Contact Page<br>
<strong>Page:</strong> https://www.tryiptv.com/contact-us<br>
<strong>Submitted:</strong> ${timestamp}
</p>`;

    const text = `New TryIPTV Support Request

Name: ${name}
Email: ${email}

Message:
${message}

Source: TryIPTV Contact Page
Page: https://www.tryiptv.com/contact-us
Submitted: ${timestamp}`;


    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'anouaraissaoui.pro+@gmail.com',
      replyTo: email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error('Resend delivery failure:', error);
      return {
        success: false,
        message: GENERIC_FORM_ERROR,
        errors: {
          form: [GENERIC_FORM_ERROR],
        },
      };
    }

    return {
      success: true,
      message: "Message sent successfully. We'll get back to you as soon as possible.",
      errors: null,
    };
  } catch (err) {
    console.error('Unexpected error while sending contact email:', err);
    return {
      success: false,
      message: GENERIC_FORM_ERROR,
      errors: {
        form: [GENERIC_FORM_ERROR],
      },
    };
  }
}
