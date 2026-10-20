import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[color,background-color,border-color,box-shadow,translate,scale,opacity] duration-200 disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-black font-semibold shadow-[0_0_20px_rgba(0,240,120,0.2)] hover:bg-[#00d66c] hover:shadow-[0_0_28px_rgba(0,240,120,0.32)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/[0.14] bg-[#07080a] text-foreground font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-white/25 hover:bg-white/[0.06]",
        secondary:
          "bg-white/[0.08] text-secondary-foreground hover:bg-white/[0.12]",
        ghost: "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 min-h-[48px] px-6 py-3 text-[15px]",
        // pointer-coarse: grow to a 44px tap target on touch screens; mouse layouts keep the compact size.
        sm: "h-9 rounded-lg px-3.5 text-xs pointer-coarse:min-h-11",
        lg: "h-[50px] min-h-[48px] px-7 py-3 text-base rounded-xl",
        icon: "h-10 w-10 rounded-xl pointer-coarse:min-h-11 pointer-coarse:min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
