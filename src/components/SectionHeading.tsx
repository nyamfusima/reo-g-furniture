import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function SectionHeading({
  index,
  title,
  action,
  className,
}: {
  index?: string
  title: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between gap-6', className)}>
      <div>
        {index && <p className="text-[13px] font-medium tracking-[0.18em] text-muted">{index}</p>}
        <h2 className="mt-2 max-w-xl text-[32px] leading-tight font-bold tracking-[-0.03em] text-ink md:text-[40px]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}
