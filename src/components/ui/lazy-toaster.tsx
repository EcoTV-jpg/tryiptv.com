"use client"

import dynamic from "next/dynamic"
import { useToast } from "@/hooks/use-toast"

// Mounts the Radix toast UI only once a toast exists; the toast store itself is tiny and
// keeps toasts in memory, so the first toast still renders once the UI chunk arrives.
const Toaster = dynamic(() => import("@/components/ui/toaster").then((mod) => mod.Toaster))

export function LazyToaster() {
  const { toasts } = useToast()
  return toasts.length > 0 ? <Toaster /> : null
}
