import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { ProductGrid } from '../components/ProductCard'
import { ProductImage } from '../components/ProductImage'
import { SectionHeader } from '../components/SectionHeader'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { useCart } from '../context/CartContext'
import { categoryLabels, getProductBySlug, products } from '../data/products'
import { cn } from '../lib/cn'
import { btn } from '../lib/ui'
import { MESSAGES } from '../lib/whatsapp'

export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) return <Navigate to="/shop" replace />

  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3)

  return (
    <>
      <section className="py-8 md:py-12">
        <Container>
          <Link to={`/category/${product.category}`} className={`${btn.ghost} text-muted`}>
            <ArrowLeft size={16} /> {categoryLabels[product.category]}
          </Link>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <ProductImage src={product.image} alt={product.name} sizes="detail" />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  className="h-20 w-16 overflow-hidden rounded-lg border border-brass bg-catalogue p-2"
                  aria-label={`${product.name} thumbnail`}
                  aria-current="true"
                >
                  <img src={product.image} alt="" className="h-full w-full object-contain" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium tracking-[0.16em] text-brass uppercase">{categoryLabels[product.category]}</p>
              <h1 className="mt-3 text-3xl font-bold tracking-[-0.03em] md:text-4xl">{product.name}</h1>
              <p className="mt-4 text-lg font-semibold">{product.priceLabel ?? 'Price on request'}</p>
              <p className="mt-2 text-sm text-muted">Available to quote · {product.colour}</p>
              <p className="mt-5 text-base leading-7 text-muted">{product.description}</p>

              <div className="mt-8 border-t border-line pt-8">
                <h2 className="text-sm font-semibold tracking-[0.16em] text-ink uppercase">Specifications</h2>
                <ul className="mt-4 grid gap-2 text-sm text-muted">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="inline-flex items-center rounded-lg border border-line">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    className="grid h-11 w-11 place-items-center hover:bg-linen"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    className="grid h-11 w-11 place-items-center hover:bg-linen"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button type="button" onClick={() => addItem(product, quantity)} className={cn(btn.primary, 'flex-1')}>
                  Add to enquiry
                </button>
              </div>

              <WhatsAppButton message={MESSAGES.product(product.name)} variant="secondary" className="mt-3 w-full">
                WhatsApp this piece
              </WhatsAppButton>

              <div className="mt-8 grid gap-6 border-t border-line pt-8 text-sm">
                <div>
                  <p className="font-semibold text-ink">Delivery</p>
                  <p className="mt-1 leading-6 text-muted">
                    Confirm delivery area, lead time and installation when you request the quote.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Custom size enquiry</p>
                  <p className="mt-1 leading-6 text-muted">
                    Need a different width, height or finish? Send the measurements and we will quote a made-to-fit piece.
                  </p>
                  <WhatsAppButton message={MESSAGES.custom} variant="secondary" className="mt-3">
                    Ask about a custom size
                  </WhatsAppButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line py-16 md:py-24">
          <Container>
            <AnimatedSection>
              <SectionHeader eyebrow="More from this room" title={`Other ${categoryLabels[product.category].toLowerCase()}`} />
              <ProductGrid products={related} className="mt-10" />
            </AnimatedSection>
          </Container>
        </section>
      )}
    </>
  )
}
