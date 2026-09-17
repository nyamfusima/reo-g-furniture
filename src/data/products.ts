import type { Product } from '../types/product'

export const categoryLabels = {
  bedroom: 'Bedroom Furniture',
  kitchen: 'Kitchen Cupboards',
  'living-room': 'Living Room Storage',
} as const

export const products: Product[] = [
  {
    id: 'rg-wardrobe-large',
    slug: 'large-wardrobe-with-drawers',
    name: 'Large Wardrobe with Drawers',
    category: 'bedroom',
    image: '/images/products/wardrobe-large.png',
    shortDescription: 'Spacious wardrobe with overhead storage and central drawers.',
    description:
      'A practical statement wardrobe designed to keep bedrooms organised with generous closed storage and easy-access drawers.',
    colour: 'White',
    featured: true,
    badge: 'Popular',
    priceLabel: 'Price on request',
    details: ['Multiple-door storage', 'Overhead compartment', 'Central drawer storage', 'Silver-tone handles'],
  },
  {
    id: 'rg-wardrobe-two-door',
    slug: 'two-door-wardrobe',
    name: '2 Door Wardrobe',
    category: 'bedroom',
    image: '/images/products/wardrobe-two-door.png',
    shortDescription: 'Compact wardrobe for bedrooms and smaller spaces.',
    description:
      'A clean two-door wardrobe with a simple footprint that works well in bedrooms, rentals and compact living spaces.',
    colour: 'White',
    featured: true,
    priceLabel: 'Price on request',
    details: ['Two-door layout', 'Compact footprint', 'Minimal design', 'Easy-clean finish'],
  },
  {
    id: 'rg-chest-grey',
    slug: 'grey-five-drawer-cabinet',
    name: '5 Drawer Storage Cabinet',
    category: 'bedroom',
    image: '/images/products/chest-grey.png',
    shortDescription: 'Grey storage unit with drawers and a side cupboard.',
    description:
      'A versatile storage cabinet combining five drawers with a full-height cupboard for clothing, linen and everyday essentials.',
    colour: 'Grey',
    featured: true,
    priceLabel: 'Price on request',
    details: ['Five drawers', 'Side cupboard', 'Metal bar handles', 'Two-tone finish'],
  },
  {
    id: 'rg-chest-white-open',
    slug: 'white-drawer-cabinet-with-shelves',
    name: 'Drawer Cabinet with Shelves',
    category: 'living-room',
    image: '/images/products/chest-white-open.png',
    shortDescription: 'Closed drawers plus flexible open cupboard shelving.',
    description:
      'A useful multipurpose cabinet for bedrooms, living rooms or utility spaces with a combination of drawers and shelving.',
    colour: 'White',
    featured: true,
    priceLabel: 'Price on request',
    details: ['Drawer storage', 'Side shelving', 'Compact footprint', 'Multipurpose use'],
  },
  {
    id: 'rg-kitchen-hutch',
    slug: 'kitchen-hutch-cupboard',
    name: 'Kitchen Hutch Cupboard',
    category: 'kitchen',
    image: '/images/products/kitchen-hutch.png',
    shortDescription: 'Large kitchen storage with glass fronts, cupboards and work space.',
    description:
      'A full kitchen hutch with display storage, closed cabinetry and open work space for appliances, crockery and pantry essentials.',
    colour: 'Greige',
    featured: true,
    badge: 'Signature',
    priceLabel: 'Price on request',
    details: ['Glass-front display doors', 'Lower cupboards', 'Open appliance shelf', 'Multiple storage zones'],
  },
  {
    id: 'rg-kitchen-sideboard',
    slug: 'kitchen-sideboard-with-drawers',
    name: 'Kitchen Sideboard with Drawers',
    category: 'kitchen',
    image: '/images/products/kitchen-sideboard-open.png',
    shortDescription: 'Wide kitchen cabinet with drawers and shelved cupboards.',
    description:
      'A practical base cabinet that adds drawer space, shelved storage and a useful countertop to kitchens or dining areas.',
    colour: 'White',
    featured: true,
    priceLabel: 'Price on request',
    details: ['Three top drawers', 'Shelved cupboards', 'Wide countertop', 'Flexible kitchen storage'],
  },
]

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)

export const getProductsByCategory = (category: string) =>
  products.filter((product) => product.category === category)
