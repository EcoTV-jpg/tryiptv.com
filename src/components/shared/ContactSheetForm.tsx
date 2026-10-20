"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "@/components/shared/Turnstile";
import type { State as ContactState } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

/**
 * Body of the contact sheet, split out of ContactSheet so its inputs and Turnstile are only
 * downloaded when the sheet is opened. Form state stays in ContactSheet (it survives closing).
 */
export function ContactSheetForm({ state, dispatch }: { state: ContactState; dispatch: (payload: FormData) => void }) {
  return (
    <form action={dispatch} className="mt-8 space-y-4">
      <div
        className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Honeypot: deliberately not called "company"/"name"-like so browser autofill never fills it. */}
        <label htmlFor="hp-ref-sheet">Leave this field empty</label>
        <input
          id="hp-ref-sheet"
          name="hp_ref"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name-sheet">Name</Label>
        <Input id="name-sheet" autoComplete="name" aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "name-sheet-error" : undefined} name="name" aria-required="true" defaultValue={state.fields?.name} placeholder="Your Name" />
        {state.errors?.name && <p id="name-sheet-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-sheet">Email</Label>
        <Input id="email-sheet" autoComplete="email" aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "email-sheet-error" : undefined} name="email" aria-required="true" type="email" defaultValue={state.fields?.email} placeholder="your@email.com" />
        {state.errors?.email && <p id="email-sheet-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.email[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message-sheet">Message</Label>
        <Textarea id="message-sheet" aria-invalid={!!state.errors?.message} aria-describedby={state.errors?.message ? "message-sheet-error" : undefined} name="message" aria-required="true" defaultValue={state.fields?.message} placeholder="How can we help you?" />
        {state.errors?.message && <p id="message-sheet-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.message[0]}</p>}
      </div>
      <Turnstile resetSignal={state} />
      <SubmitButton />
    </form>
  );
}
