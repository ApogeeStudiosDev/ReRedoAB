import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface CounterProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  delay?: number
}

const Counter = ({
  end,
  duration = 2.5,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  delay = 0
}: CounterProps) => {
  const [shouldStart, setShouldStart] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setShouldStart(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [inView, delay])

  return (
    <span ref={ref} className={className}>
      {shouldStart ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          preserveValue
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  )
}

export default Counter