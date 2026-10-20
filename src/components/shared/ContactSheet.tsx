
"use client";

import { useEffect, useState, useActionState } from "react";
import dynamic from "next/dynamic";
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
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions";

// The form body (inputs, Turnstile) is only needed once the sheet opens, so it is code-split
// off the bundle every page loads; hovering/focusing/touching the button starts the download early.
const loadForm = () => import("@/components/shared/ContactSheetForm");
const ContactSheetForm = dynamic(() => loadForm().then((mod) => mod.ContactSheetForm));

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
          onPointerEnter={loadForm}
          onFocus={loadForm}
          onTouchStart={loadForm}
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
          <ContactSheetForm state={state} dispatch={dispatch} />
        </SheetContent>
      )}
    </Sheet>
  );
}
