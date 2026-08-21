import type { ProductCategory } from "./ProductCategory";

export type ProductModel = {
  id: number
  sku: string
  name: string
  description: string
  image: string
  price: number
  discount: number | null
  postedAt?: string
  category?: ProductCategory
}