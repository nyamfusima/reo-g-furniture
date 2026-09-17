import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { categoryLabels } from '../data/products'
import { cn } from '../lib/cn'
import type { Product } from '../types/product'
import { ProductImage } from './ProductImage'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <article className="group rounded-xl border border-line bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/product/${product.slug}`} className="block">
        <ProductImage src={product.image} alt={product.name} frameClassName="rounded-t-xl rounded-b-none" />
      </Link>

      <div className="p-4 sm:p-5">
        <p className="text-sm font-medium text-muted">{categoryLabels[product.category]}</p>
        <Link
          to={`/product/${product.slug}`}
          className="mt-1 block text-base font-semibold leading-snug text-ink transition-colors duration-200 group-hover:text-brass sm:text-lg"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-sm font-medium text-ink">{product.priceLabel ?? 'Price on request'}</p>
        <p className="mt-1 text-sm text-muted">Available to quote</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="text-sm font-semibold text-charcoal transition-colors duration-200 hover:text-brass"
          >
            Add to enquiry
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            aria-label={`View ${product.name}`}
          >
            View
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export function ProductGrid({
  products,
  className,
}: {
  products: Product[]
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
