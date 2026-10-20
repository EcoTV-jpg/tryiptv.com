
"use client";

import { useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions";
import { Turnstile } from "@/components/shared/Turnstile";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export function ContactSheet() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const initialState = { message: null, errors: null };
  const [state, dispatch] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success!",
        description: state.message,
      });
      const timer = setTimeout(() => setIsOpen(false), 0);
      return () => clearTimeout(timer);
    } else if (state.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {/* Offset by the safe-area insets so the button clears the iPhone home indicator / notch. */}
        <Button
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-[calc(1.5rem+env(safe-area-inset-right,0px))] z-50 h-14 w-14 rounded-full shadow-lg"
          aria-label="Open contact form"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      {isOpen && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Contact Us</SheetTitle>
            <SheetDescription>
              Have a question or need support? Fill out the form below and we&apos;ll get back to you shortly.
            </SheetDescription>
          </SheetHeader>
          <form action={dispatch} className="mt-8 space-y-4">
            <div
              className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
              aria-hidden="true"
            >
              <label htmlFor="company-sheet">Company</label>
              <input
                id="company-sheet"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name-sheet">Name</Label>
              <Input id="name-sheet" autoComplete="name" aria-invalid={!!state.errors?.name} aria-describedby={state.errors?.name ? "name-sheet-error" : undefined} name="name" defaultValue={state.fields?.name} placeholder="Your Name" />
              {state.errors?.name && <p id="name-sheet-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-sheet">Email</Label>
              <Input id="email-sheet" autoComplete="email" aria-invalid={!!state.errors?.email} aria-describedby={state.errors?.email ? "email-sheet-error" : undefined} name="email" type="email" defaultValue={state.fields?.email} placeholder="your@email.com" />
              {state.errors?.email && <p id="email-sheet-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message-sheet">Message</Label>
              <Textarea id="message-sheet" aria-invalid={!!state.errors?.message} aria-describedby={state.errors?.message ? "message-sheet-error" : undefined} name="message" defaultValue={state.fields?.message} placeholder="How can we help you?" />
              {state.errors?.message && <p id="message-sheet-error" role="alert" className="text-base sm:text-sm text-red-400">{state.errors.message[0]}</p>}
            </div>
            <Turnstile resetSignal={state} />
            <SubmitButton />
          </form>
        </SheetContent>
      )}
    </Sheet>
  );
}
