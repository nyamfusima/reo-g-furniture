export type ProductCategory = 'bedroom' | 'kitchen' | 'living-room'

export type Product = {
  id: string
  slug: string
  name: string
  category: ProductCategory
  image: string
  shortDescription: string
  description: string
  colour: 'White' | 'Grey' | 'Greige'
  featured?: boolean
  badge?: string
  price?: number
  priceLabel?: string
  details: string[]
}

export type CartItem = {
  product: Product
  quantity: number
}
