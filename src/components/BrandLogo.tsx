import { Link } from 'react-router-dom'
import { cn } from '../lib/cn'

export function BrandLogo({
  inverse = false,
  size = 'nav',
}: {
  inverse?: boolean
  size?: 'nav' | 'footer'
}) {
  const compact = size === 'nav'

  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Reo G Furniture home">
      <img
        src="/images/logo.jpg"
        alt=""
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        className={cn('rounded-full object-cover object-top', compact ? 'h-8 w-8' : 'h-10 w-10')}
      />
      <span className={cn('font-semibold tracking-[-0.02em]', compact ? 'text-[16px]' : 'text-lg', inverse ? 'text-white' : 'text-ink')}>
        {compact ? 'Reo G' : 'Reo G Furniture'}
      </span>
    </Link>
  )
}
