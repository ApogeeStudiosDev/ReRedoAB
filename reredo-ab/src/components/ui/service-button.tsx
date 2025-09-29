import * as React from "react"
import { motion } from "framer-motion"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const serviceButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-lg hover:scale-105 rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-lg hover:scale-105 rounded-xl",
        bookkeeping: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-xl hover:scale-105 rounded-xl",
        accounting: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-xl hover:scale-105 rounded-xl",
        analysis: "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-md hover:shadow-xl hover:scale-105 rounded-xl",
        tax: "bg-gradient-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800 shadow-md hover:shadow-xl hover:scale-105 rounded-xl",
        glass: "backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 shadow-lg hover:shadow-xl hover:scale-105 rounded-xl",
        cta: "bg-gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 rounded-full",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:scale-105 rounded-xl",
        magnetic: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-lg hover:scale-110 hover:-translate-y-1 rounded-xl",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 py-2",
        lg: "h-12 px-8 py-3",
        xl: "h-14 px-10 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ServiceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof serviceButtonVariants> {
  asChild?: boolean
  loading?: boolean
  success?: boolean
  magnetic?: boolean
}

const ServiceButton = React.forwardRef<HTMLButtonElement, ServiceButtonProps>(
  ({ className, variant, size, asChild = false, loading, success, magnetic = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const MotionComp = motion(Comp as any)

    return (
      <MotionComp
        className={cn(serviceButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        whileHover={magnetic ? { scale: 1.05, y: -2 } : { scale: 1.02 }}
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
        {children}
        
        {/* Magnetic effect background */}
        {magnetic && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </MotionComp>
    )
  }
)
ServiceButton.displayName = "ServiceButton"

export { ServiceButton, serviceButtonVariants }