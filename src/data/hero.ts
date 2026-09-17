import { products } from './products'
import type { Product } from '../types/product'

export type HeroCategoryId = 'bedroom' | 'kitchen' | 'living-room' | 'wardrobes' | 'custom'

export type HeroCategory = {
  id: HeroCategoryId
  label: string
  image: string
  alt: string
  products: Product[]
}

export const heroCategories: HeroCategory[] = [
  {
    id: 'bedroom',
    label: 'Bedroom',
    image: '/images/products/wardrobe-large.png',
    alt: 'Large Reo G wardrobe',
    products: products.filter((product) => product.category === 'bedroom'),
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    image: '/images/products/kitchen-hutch.png',
    alt: 'Reo G kitchen hutch',
    products: products.filter((product) => product.category === 'kitchen'),
  },
  {
    id: 'living-room',
    label: 'Living Room',
    image: '/images/products/chest-white-open.png',
    alt: 'Reo G living room cabinet',
    products: products.filter((product) => product.category === 'living-room'),
  },
  {
    id: 'wardrobes',
    label: 'Wardrobes',
    image: '/images/products/wardrobe-two-door.png',
    alt: 'Two-door Reo G wardrobe',
    products: products.filter((product) => product.name.toLowerCase().includes('wardrobe')),
  },
  {
    id: 'custom',
    label: 'Custom Furniture',
    image: '/images/products/kitchen-sideboard-open.png',
    alt: 'Custom kitchen sideboard',
    products: products.filter((product) => product.featured),
  },
]
