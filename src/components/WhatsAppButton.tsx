import type { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { btn } from '../lib/ui'
import { buildWhatsAppUrl } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const variants = {
  whatsapp: btn.whatsapp,
  secondary: btn.secondary,
  gradient: btn.gradient,
}

export function WhatsAppButton({
  message,
  children = 'Get a quote',
  variant = 'whatsapp',
  className,
}: {
  message: string
  children?: ReactNode
  variant?: 'whatsapp' | 'secondary' | 'gradient'
  className?: string
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={cn(variants[variant], 'group/wa', className)}
    >
      <WhatsAppIcon size={17} className="transition-transform duration-300 group-hover/wa:translate-x-0.5" />
      {children}
    </a>
  )
}
