import { cn } from '../lib/cn'

export function ProductImage({
  src,
  alt,
  className,
  frameClassName,
  sizes = 'default',
  lazy = true,
}: {
  src: string
  alt: string
  className?: string
  frameClassName?: string
  sizes?: 'default' | 'detail'
  lazy?: boolean
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[16px] bg-product',
        sizes === 'detail' ? 'p-8 md:p-12' : 'p-6 md:p-8',
        frameClassName,
      )}
    >
      <div className={cn('aspect-[4/5]', className)}>
        <img
          src={src}
          alt={alt}
          loading={lazy ? 'lazy' : 'eager'}
          className="h-full w-full object-contain object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  )
}
