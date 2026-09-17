import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { cn } from '../lib/cn'
import { buildWhatsAppUrl, MESSAGES } from '../lib/whatsapp'
import { btn } from '../lib/ui'
import { BrandLogo } from './BrandLogo'
import { WhatsAppButton } from './WhatsAppButton'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

const links = [
  { label: 'About us', to: '/about' },
  { label: 'Furniture', to: '/shop' },
  { label: 'Bedroom', to: '/category/bedroom' },
  { label: 'Kitchen', to: '/category/kitchen' },
  { label: 'Living Room', to: '/category/living-room' },
  { label: 'Contact', to: '/contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mobileSearch, setMobileSearch] = useState(false)
  const { count } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMenuOpen(false)
    setMobileSearch(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const value = query.trim()
    navigate(value ? `/shop?q=${encodeURIComponent(value)}` : '/shop')
    setMobileSearch(false)
    setMenuOpen(false)
  }

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[76px] lg:px-12">
        <BrandLogo />

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={`${link.label}-${link.to}`}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'group relative pb-1 text-[13px] font-medium text-muted transition-colors duration-300 hover:text-ink',
                  isActive && 'text-ink',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gradient-to-r from-reo to-cyan transition-transform duration-300 ease-out',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <a
          href={buildWhatsAppUrl(MESSAGES.quote)}
          target="_blank"
          rel="noreferrer"
          className={cn(btn.gradient, 'hidden !py-2.5 !px-5 xl:inline-flex')}
        >
          <WhatsAppIcon size={15} />
          Get a Quote
        </a>

        <div className="flex h-[42px] items-center gap-1.5">
          <form onSubmit={submitSearch} className="hidden md:block">
            <label className="sr-only" htmlFor="site-search">
              Search furniture
            </label>
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
              <input
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search furniture"
                className="h-[42px] w-[168px] rounded-xl bg-[#F5F5F5] pr-8 pl-9 text-[13px] text-ink outline-none transition-all duration-300 ease-out placeholder:text-muted focus:w-[220px]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted hover:text-ink"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          <button
            type="button"
            onClick={() => setMobileSearch((value) => !value)}
            className="grid h-[42px] w-[42px] place-items-center rounded-xl text-ink md:hidden"
            aria-label="Search furniture"
          >
            <Search size={18} />
          </button>

          <NavLink
            to="/cart"
            className="relative grid h-[42px] w-[42px] place-items-center rounded-xl text-ink"
            aria-label={`Quote basket with ${count} items`}
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-reo"
              />
            )}
          </NavLink>

          <button
            type="button"
            className="grid h-[42px] w-[42px] place-items-center rounded-xl text-ink xl:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileSearch && (
          <motion.form
            onSubmit={submitSearch}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-5 pb-3 md:hidden"
          >
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search furniture"
              className="h-[42px] w-full rounded-xl bg-[#F5F5F5] px-4 text-[13px] outline-none"
            />
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-navy/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col bg-white px-6 py-6"
            >
              <div className="flex items-center justify-between">
                <BrandLogo />
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-xl"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-8 grid gap-1">
                {links.map((link) => (
                  <NavLink
                    key={`${link.label}-${link.to}`}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn('rounded-xl px-3 py-3 text-[15px] font-medium text-muted', isActive && 'bg-panel text-ink')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <WhatsAppButton message={MESSAGES.quote} className="mt-8">
                Get a quote
              </WhatsAppButton>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
