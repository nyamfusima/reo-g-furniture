import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '../components/AnimatedSection'
import { Container } from '../components/Container'
import { ProductImage } from '../components/ProductImage'
import { useCart } from '../context/CartContext'
import { btn } from '../lib/ui'
import { openWhatsApp } from '../lib/whatsapp'

export function CartPage() {
  const { items, count, updateQuantity, removeItem, clearCart } = useCart()

  const sendQuote = () => {
    const lines = items.map((item) => `• ${item.product.name} × ${item.quantity}`)
    const message = `Hi Reo G Furniture, I would like a quote for:\n${lines.join('\n')}\n\nPlease send current pricing, availability and delivery options.`
    openWhatsApp(message)
  }

  if (!items.length) {
    return (
      <section className="py-24">
        <Container className="max-w-xl text-center">
          <AnimatedSection>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-linen text-brass">
              <ShoppingBag size={22} />
            </span>
            <h1 className="mt-6 text-3xl font-bold tracking-[-0.03em] md:text-4xl">Your quote basket is empty.</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              Add furniture, then send the full enquiry to Reo G Furniture in one WhatsApp message.
            </p>
            <Link to="/shop" className={`${btn.gradient} mt-7`}>
              Browse furniture <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <AnimatedSection className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-brass uppercase">Quote basket</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              {count} item{count === 1 ? '' : 's'} ready to enquire.
            </h1>
          </div>
          <button type="button" onClick={clearCart} className="text-sm font-semibold text-muted hover:text-red-700">
            Clear basket
          </button>
        </AnimatedSection>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map(({ product, quantity }, i) => (
              <AnimatedSection
                key={product.id}
                delay={Math.min(i * 0.05, 0.3)}
                className="flex flex-col gap-5 rounded-xl border border-line bg-white p-4 sm:flex-row sm:items-center"
              >
                <Link to={`/product/${product.slug}`} className="sm:w-32">
                  <ProductImage src={product.image} alt={product.name} frameClassName="p-4 md:p-4" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted">{product.colour}</p>
                  <Link to={`/product/${product.slug}`} className="mt-1 block text-lg font-semibold">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{product.priceLabel ?? 'Price on request'}</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-lg border border-line">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="grid h-9 w-9 place-items-center hover:bg-linen"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="grid h-9 w-9 place-items-center hover:bg-linen"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-red-700"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection as="aside" delay={0.15} className="h-max rounded-2xl bg-charcoal p-6 text-white lg:sticky lg:top-32">
            <p className="text-sm font-medium tracking-[0.16em] text-white/50 uppercase">Next step</p>
            <h2 className="mt-3 text-2xl font-semibold">Request current pricing.</h2>
            <p className="mt-3 text-sm leading-6 text-white/60">
              The basket sends the selected products and quantities in one WhatsApp enquiry. No payment is taken here.
            </p>
            <button type="button" onClick={sendQuote} className={`${btn.whatsapp} mt-6 w-full`}>
              Send quote request <ArrowRight size={16} />
            </button>
            <Link to="/shop" className="mt-4 block text-center text-sm font-medium text-white/50 hover:text-white">
              Continue shopping
            </Link>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
