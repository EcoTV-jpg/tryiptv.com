
'use client';

import { useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions';
import { Turnstile } from '@/components/shared/Turnstile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const initialState = { success: false, message: null, errors: null };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message && !state.errors) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div
        className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Honeypot: deliberately not called "company"/"name"-like so browser autofill never fills it. */}
        <label htmlFor="hp-ref-form">Leave this field empty</label>
        <input
          id="hp-ref-form"
          name="hp_ref"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
      {state.message && !state.errors && (
        <div role="status" className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm text-primary">
          {state.message}
        </div>
      )}
      {/* Error text uses red-400 (~6.9:1 on the dark card); --destructive (#7f1d1d) is only 2:1 as text. */}
      {state.errors?.form && (
        <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-red-400">
          {state.errors.form[0]}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name-form">Name</Label>
        <Input id="name-form" autoComplete="name" aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? 'name-form-error' : undefined} name="name" aria-required="true" defaultValue={state.fields?.name} placeholder="Your Name" />
        {state.errors?.name && (
          <p id="name-form-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-form">Email</Label>
        <Input
          id="email-form"
          autoComplete="email"
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? 'email-form-error' : undefined}
          name="email" aria-required="true"
          defaultValue={state.fields?.email}
          type="email"
          placeholder="your@email.com"
        />
        {state.errors?.email && (
          <p id="email-form-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.email[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message-form">Message</Label>
        <Textarea id="message-form" aria-invalid={!!state.errors?.message} aria-describedby={state.errors?.message ? 'message-form-error' : undefined} name="message" aria-required="true" defaultValue={state.fields?.message} placeholder="How can we help you?" />
        {state.errors?.message && (
          <p id="message-form-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.message[0]}</p>
        )}
      </div>
      <Turnstile resetSignal={state} />
      <SubmitButton />
    </form>
  );
}
