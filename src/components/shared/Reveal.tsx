"use client";

import { motion, useInView, useAnimation, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  },
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const mainControls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView || shouldReduceMotion) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls, shouldReduceMotion]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div
        variants={variants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate={shouldReduceMotion ? "visible" : mainControls}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
