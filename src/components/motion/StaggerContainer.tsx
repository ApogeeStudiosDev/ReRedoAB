import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  initial?: { opacity?: number; y?: number; x?: number; scale?: number }
  animate?: { opacity?: number; y?: number; x?: number; scale?: number }
}

const StaggerContainer = ({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 }
}: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: initial,
                show: animate
              }}
              transition={{
                duration: 0.6,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
            >
              {child}
            </motion.div>
          ))
        : <motion.div
            variants={{
              hidden: initial,
              show: animate
            }}
            transition={{
              duration: 0.6,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            {children}
          </motion.div>
      }
    </motion.div>
  )
}

export default StaggerContainer