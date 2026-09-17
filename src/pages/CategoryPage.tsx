import { ArrowRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { LeadBanner } from '../components/LeadBanner'
import { ProductGrid } from '../components/ProductCard'
import { SectionHeader } from '../components/SectionHeader'
import { categoryLabels, getProductsByCategory } from '../data/products'
import { btn } from '../lib/ui'
import type { ProductCategory } from '../types/product'

const categoryMeta: Record<ProductCategory, { eyebrow: string; title: string; description: string; image: string }> = {
  bedroom: {
    eyebrow: 'Bedroom',
    title: 'Wardrobes and storage for a calmer bedroom.',
    description: 'Drawer units and wardrobes designed for everyday clothes, linen and the space you actually have.',
    image: '/images/products/wardrobe-large.png',
  },
  kitchen: {
    eyebrow: 'Kitchen',
    title: 'Cupboards that make the kitchen easier to use.',
    description: 'Hutches and sideboards with closed storage, drawers and space for the things you reach for daily.',
    image: '/images/products/kitchen-hutch.png',
  },
  'living-room': {
    eyebrow: 'Living room',
    title: 'Storage that keeps shared rooms tidy.',
    description: 'Multipurpose cabinets for living rooms, passages and the rooms that collect everything else.',
    image: '/images/products/chest-white-open.png',
  },
}

export function CategoryPage() {
  const { category } = useParams()
  if (!category || !(category in categoryMeta)) return <Navigate to="/shop" replace />
  const key = category as ProductCategory
  const meta = categoryMeta[key]
  const categoryProducts = getProductsByCategory(key)

  return (
    <>
      <section className="border-b border-line bg-linen">
        <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">{meta.eyebrow}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-4xl">{meta.title}</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">{meta.description}</p>
            <Link to="/contact" className={`${btn.primary} mt-7 group`}>
              Ask about custom sizes
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl bg-catalogue p-8 md:p-10">
            <img src={meta.image} alt={categoryLabels[key]} className="mx-auto max-h-[420px] w-full object-contain" />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <AnimatedSection>
            <SectionHeader eyebrow={categoryLabels[key]} title="Browse the range" />
            {categoryProducts.length ? (
              <ProductGrid products={categoryProducts} className="mt-10" />
            ) : (
              <div className="mt-10 rounded-2xl bg-linen px-6 py-16 text-center">
                <h3 className="text-2xl font-semibold">More products are being added.</h3>
                <p className="mt-2 text-sm text-muted">Use WhatsApp for current availability and custom enquiries.</p>
              </div>
            )}
          </AnimatedSection>
        </Container>
      </section>
      <LeadBanner />
    </>
  )
}
