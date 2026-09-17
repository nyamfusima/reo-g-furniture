import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Filter, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '../components/Container'
import { ProductGrid } from '../components/ProductCard'
import { categoryLabels, products } from '../data/products'
import { cn } from '../lib/cn'
import { field } from '../lib/ui'
import type { ProductCategory } from '../types/product'

const categories: Array<{ value: 'all' | ProductCategory; label: string }> = [
  { value: 'all', label: 'All products' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'living-room', label: 'Living room' },
]

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<'all' | ProductCategory>('all')
  const [colour, setColour] = useState('all')
  const [price, setPrice] = useState('all')
  const [stock, setStock] = useState('all')
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [filtersOpen])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = products.filter((product) => {
      const matchesQuery =
        !q || `${product.name} ${product.shortDescription} ${categoryLabels[product.category]}`.toLowerCase().includes(q)
      const matchesCategory = category === 'all' || product.category === category
      const matchesColour = colour === 'all' || product.colour === colour
      const matchesPrice = price === 'all' || Boolean(product.priceLabel)
      const matchesStock = stock === 'all' || stock === 'quote'
      return matchesQuery && matchesCategory && matchesColour && matchesPrice && matchesStock
    })

    if (sort === 'name') return [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'category') return [...list].sort((a, b) => a.category.localeCompare(b.category))
    return list
  }, [query, category, colour, price, stock, sort])

  const updateQuery = (value: string) => {
    setQuery(value)
    const next = new URLSearchParams(searchParams)
    if (value.trim()) next.set('q', value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => {
    setCategory('all')
    setColour('all')
    setPrice('all')
    setStock('all')
    updateQuery('')
  }

  const filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Room</legend>
        <div className="mt-3 grid gap-1">
          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCategory(item.value)}
              className={cn(
                'rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
                category === item.value ? 'bg-linen text-ink' : 'text-muted hover:bg-linen/70 hover:text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        Colour
        <select value={colour} onChange={(event) => setColour(event.target.value)} className={field}>
          <option value="all">All colours</option>
          <option>White</option>
          <option>Grey</option>
          <option>Greige</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        Price
        <select value={price} onChange={(event) => setPrice(event.target.value)} className={field}>
          <option value="all">All</option>
          <option value="request">On request</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        Availability
        <select value={stock} onChange={(event) => setStock(event.target.value)} className={field}>
          <option value="all">All</option>
          <option value="quote">Available to quote</option>
        </select>
      </label>

      <button type="button" onClick={clearFilters} className="text-sm font-semibold text-muted hover:text-ink">
        Clear filters
      </button>
    </div>
  )

  return (
    <>
      <section className="border-b border-line bg-linen">
        <Container className="py-12 md:py-16">
          <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">The collection</p>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-4xl">Shop furniture</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Browse bedroom, kitchen and living room storage. Current pricing is confirmed by quote.
          </p>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block max-w-xl flex-1">
              <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search products..."
                className={`${field} py-3.5 pl-11`}
              />
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-semibold lg:hidden"
              >
                <Filter size={16} /> Filters
              </button>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className={`${field} w-auto`}>
                <option value="featured">Featured</option>
                <option value="name">Name A–Z</option>
                <option value="category">Category</option>
              </select>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">{filters}</aside>
            <div>
              <p className="mb-5 text-sm text-muted">
                {filtered.length} product{filtered.length === 1 ? '' : 's'}
              </p>
              {filtered.length ? (
                <ProductGrid products={filtered} />
              ) : (
                <div className="rounded-2xl border border-dashed border-line px-6 py-20 text-center">
                  <h2 className="text-2xl font-semibold">No products found</h2>
                  <p className="mt-2 text-sm text-muted">Try another search or clear the filters.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-ink/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={reduceMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduceMotion ? undefined : { x: '100%' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-y-0 right-0 w-[min(100%,22rem)] overflow-y-auto bg-canvas px-6 py-6 shadow-lift"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-lg hover:bg-linen"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
              {filters}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
