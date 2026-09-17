import { BrandLogo } from './BrandLogo'

export function Logo({ inverse = false }: { inverse?: boolean; compact?: boolean }) {
  return <BrandLogo inverse={inverse} size={inverse ? 'footer' : 'nav'} />
}
