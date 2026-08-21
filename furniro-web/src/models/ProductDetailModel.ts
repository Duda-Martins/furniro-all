import type { ProductCategory } from './ProductCategory'
import type { ProductAttributeModel } from './ProductAttributeModel'
import type { ProductVariantModel } from './ProductVariantModel'
 
export type ProductDetailModel = {
  id: number
  sku: string
  name: string
  description: string
  fullDescription: string
  additionalInformation: string
  image: string
  images: string[] | null
  price: number
  discount: number | null
  postedAt: string
  categoryId: number
  category?: ProductCategory
  attributes?: ProductAttributeModel
  variants?: ProductVariantModel[]
}