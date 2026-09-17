import { motion, useReducedMotion } from 'framer-motion'
import type { FormEventHandler, ReactNode } from 'react'
import { cn } from '../lib/cn'

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'form' | 'aside'
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export function AnimatedSection({ children, className, delay = 0, as = 'div', onSubmit }: AnimatedSectionProps) {
  const reduceMotion = useReducedMotion()
  const motionProps = {
    className: cn(className),
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  }

  if (as === 'form') {
    return (
      <motion.form onSubmit={onSubmit} {...motionProps}>
        {children}
      </motion.form>
    )
  }

  if (as === 'aside') {
    return <motion.aside {...motionProps}>{children}</motion.aside>
  }

  return <motion.div {...motionProps}>{children}</motion.div>
}
