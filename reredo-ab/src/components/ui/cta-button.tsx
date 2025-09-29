import * as React from "react"
import { motion } from "framer-motion"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ctaButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-gradient-primary text-white shadow-lg hover:shadow-xl rounded-full",
        secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl rounded-full",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-lg rounded-full",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl rounded-full",
        floating: "bg-primary text-primary-foreground shadow-2xl hover:shadow-3xl rounded-full",
      },
      size: {
        sm: "h-10 px-6 py-2 text-sm",
        default: "h-12 px-8 py-3 text-base",
        lg: "h-14 px-10 py-4 text-lg",
        xl: "h-16 px-12 py-5 text-xl",
      },
      animation: {
        none: "",
        bounce: "hover:animate-bounce",
        magnetic: "hover:scale-105 hover:-translate-y-1",
        glow: "hover:shadow-glow",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      animation: "magnetic",
    },
  }
)

export interface CTAButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ctaButtonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
  icon?: React.ReactNode
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant, size, animation, asChild = false, loading, success, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const MotionComp = motion(Comp as any)

    return (
      <MotionComp
        className={cn(ctaButtonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={loading}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
        )}
        {success && (
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {icon && <span className="mr-2">{icon}</span>}
        <span className="font-urbanist font-semibold">{children}</span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      </MotionComp>
    )
  }
)
CTAButton.displayName = "CTAButton"

export { CTAButton, ctaButtonVariants }