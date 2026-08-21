import type { ProductModel } from "./ProductModel";

export interface ProductResponseModel {
    products: ProductModel[];
    hasMore: boolean;
}
