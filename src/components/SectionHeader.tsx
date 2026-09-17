import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">{eyebrow}</p>}
        <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-ink md:text-[2rem]">{title}</h2>
        {description && <p className="mt-3 max-w-xl text-base leading-7 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
