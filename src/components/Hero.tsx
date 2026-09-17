import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Facebook, Heart, Instagram } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroCategories, type HeroCategoryId } from '../data/hero'
import { cn } from '../lib/cn'
import { btn } from '../lib/ui'
import type { Product } from '../types/product'
import { CarouselButton } from './CarouselButton'

const ease = [0.22, 1, 0.36, 1] as const

const socialLinks = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Facebook, label: 'Facebook' },
]

export function Hero() {
  const [active, setActive] = useState<HeroCategoryId>('bedroom')
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [liked, setLiked] = useState<string[]>([])
  const reduceMotion = useReducedMotion()

  const categoryIndex = Math.max(
    0,
    heroCategories.findIndex((item) => item.id === active),
  )
  const category = heroCategories[categoryIndex] ?? heroCategories[0]
  const visibleCount = 3
  const maxIndex = Math.max(0, category.products.length - 1)

  const visibleProducts = useMemo(() => {
    if (category.products.length <= visibleCount) return category.products
    return Array.from({ length: visibleCount }, (_, offset) => category.products[(index + offset) % category.products.length])
  }, [category.products, index])

  const selectCategory = (id: HeroCategoryId) => {
    setActive(id)
    setIndex(0)
    setDirection(1)
  }

  const slide = (dir: number) => {
    setDirection(dir)
    setIndex((current) => {
      const next = current + dir
      if (next < 0) return maxIndex
      if (next > maxIndex) return 0
      return next
    })
  }

  const toggleLike = (id: string) => {
    setLiked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return (
    <section className="relative overflow-hidden bg-page">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-24 h-[380px] w-[380px] rounded-full bg-indigo/25 blur-3xl sm:h-[440px] sm:w-[440px]"
          animate={reduceMotion ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-24 right-0 h-[340px] w-[340px] rounded-full bg-reo/20 blur-3xl sm:h-[400px] sm:w-[400px]"
          animate={reduceMotion ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[-140px] left-1/4 h-[340px] w-[340px] rounded-full bg-cyan/25 blur-3xl sm:h-[380px] sm:w-[380px]"
          animate={reduceMotion ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute right-0 bottom-[-160px] h-[340px] w-[340px] rounded-full bg-indigo/15 blur-3xl sm:h-[400px] sm:w-[400px]"
          animate={reduceMotion ? undefined : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 pt-8 pb-10 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-12 lg:pt-12 lg:pb-14">
        <div className="flex flex-col lg:h-full lg:justify-between">
          <div>
            <h1 className="max-w-[16ch] text-[38px] leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px] lg:text-[56px] xl:text-[62px]">
              <motion.span
                className="block font-medium text-ink/75"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                Find Furniture
              </motion.span>
              <motion.span
                className="block font-extrabold"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.08 }}
              >
                Made for Your Home
              </motion.span>
            </h1>
            <motion.p
              className="mt-5 max-w-sm text-[14px] leading-7 text-muted lg:text-[15px]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.16 }}
            >
              Bedroom, kitchen and living room furniture made for modern South African homes.
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.24 }}
            >
              <Link to="/shop" className={cn(btn.gradient, 'group mt-7')}>
                Discover Now
                <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-0"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.32 }}
          >
            <div className="flex items-center gap-2">
              {heroCategories.map((item) => {
                const selected = item.id === active
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectCategory(item.id)}
                    aria-label={`Show ${item.label}`}
                    aria-current={selected}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300 ease-out',
                      selected ? 'w-6 bg-gradient-to-r from-reo to-cyan' : 'w-2 bg-ink/15 hover:bg-ink/30',
                    )}
                  />
                )
              })}
            </div>
            <div className="flex items-center gap-3 text-[13px] text-muted">
              <span>Follow us:</span>
              <div className="flex gap-2">
                {socialLinks.map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-reo"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="relative mx-auto w-[84%] max-w-[400px] sm:max-w-[440px] lg:w-full lg:max-w-[460px]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease, delay: 0.14 }}
          >
            <div className="absolute inset-x-6 bottom-6 h-1/2 rounded-full bg-gradient-to-t from-cyan/30 to-transparent opacity-80 blur-2xl" />
            <motion.div
              animate={reduceMotion ? undefined : { y: [-3, 3, -3] }}
              transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-x-16 bottom-4 h-10 rounded-full bg-black/10 blur-2xl" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={category.image}
                  src={category.image}
                  alt={category.alt}
                  width={720}
                  height={860}
                  initial={reduceMotion ? false : { opacity: 0, x: -16, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -16, scale: 0.98 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative mx-auto max-h-[280px] w-full object-contain drop-shadow-[0_24px_32px_rgba(17,17,17,0.14)] sm:max-h-[340px] lg:max-h-[420px] xl:max-h-[460px]"
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-black/5 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 lg:px-12 lg:py-7">
          <div className="no-scrollbar flex gap-3 overflow-x-auto lg:max-w-[62%] lg:gap-3 lg:overflow-visible">
            {heroCategories.map((item, order) => {
              const selected = active === item.id
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => selectCategory(item.id)}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.18 + order * 0.05 }}
                  className={cn(
                    'flex h-[92px] w-[100px] shrink-0 items-center justify-center rounded-xl bg-white px-3 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 sm:h-[100px] sm:w-[112px]',
                    selected && 'bg-panel ring-1 ring-reo/40',
                  )}
                >
                  <span className="flex flex-col items-center justify-center gap-1.5">
                    <span className="text-[12.5px] leading-4 font-semibold text-ink">
                      {item.label.includes(' ') ? (
                        <>
                          {item.label.split(' ').map((word) => (
                            <span key={word} className="block">
                              {word}
                            </span>
                          ))}
                        </>
                      ) : (
                        item.label
                      )}
                    </span>
                    <span className={cn('h-1 w-1 rounded-full transition-colors', selected ? 'bg-reo' : 'bg-transparent')} />
                  </span>
                </motion.button>
              )
            })}
          </div>

          <motion.div
            className="mt-5 flex items-center gap-3 lg:mt-6 lg:gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.36 }}
          >
            <CarouselButton direction="prev" label="Previous products" onClick={() => slide(-1)} />

            <div className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${active}-${index}`}
                  custom={direction}
                  initial={reduceMotion ? false : { opacity: 0, x: direction > 0 ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0.35, x: direction > 0 ? -40 : 40 }}
                  transition={{ duration: 0.38, ease }}
                  className="flex gap-3"
                >
                  {visibleProducts.map((product) => (
                    <HeroProductCard
                      key={product.id}
                      product={product}
                      liked={liked.includes(product.id)}
                      onLike={() => toggleLike(product.id)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <CarouselButton direction="next" label="Next products" onClick={() => slide(1)} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroProductCard({
  product,
  liked,
  onLike,
}: {
  product: Product
  liked: boolean
  onLike: () => void
}) {
  return (
    <article className="flex h-[96px] w-[72vw] max-w-[248px] shrink-0 items-center gap-2.5 rounded-xl bg-white px-2.5 sm:w-[236px]">
      <Link
        to={`/product/${product.slug}`}
        className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-lg bg-product p-1.5"
      >
        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain" />
      </Link>
      <div className="min-w-0 flex-1 py-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.slug}`} className="line-clamp-2 text-[13px] leading-4 font-semibold text-ink">
            {product.name}
          </Link>
          <button
            type="button"
            onClick={onLike}
            aria-label={liked ? `Remove ${product.name} from saved` : `Save ${product.name}`}
            className="mt-0.5 shrink-0 text-muted transition-colors hover:text-ink"
          >
            <Heart size={14} className={liked ? 'fill-ink text-ink' : ''} />
          </button>
        </div>
        <p className="mt-1.5 text-[12px] text-muted">{product.priceLabel ?? 'Price on request'}</p>
      </div>
    </article>
  )
}
