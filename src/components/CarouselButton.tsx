import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../lib/cn'

export function CarouselButton({
  direction,
  onClick,
  label,
  variant,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
  variant?: 'light' | 'dark'
}) {
  const dark = variant ?? (direction === 'next' ? 'dark' : 'light')

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-out hover:scale-105 active:scale-95 lg:h-11 lg:w-11',
        dark === 'dark' ? 'bg-navy text-white' : 'bg-white text-ink shadow-sm',
      )}
    >
      {direction === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  )
}
