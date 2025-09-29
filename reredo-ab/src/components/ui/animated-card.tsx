import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
  magnetic?: boolean
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, delay = 0, hover = true, magnetic = false }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-card/60 backdrop-blur-sm rounded-2xl border border-border/20 transition-all duration-300",
          hover && "hover:bg-card/80 hover:shadow-lg hover:scale-[1.02]",
          magnetic && "hover:scale-105 hover:-translate-y-1",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.6, 
          delay,
          ease: [0.21, 0.47, 0.32, 0.98]
        }}
        whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      >
        {children}
      </motion.div>
    )
  }
)
AnimatedCard.displayName = "AnimatedCard"

export { AnimatedCard }