import type { ProductModel } from "../models/ProductModel";
import type { ProductFilter } from "../models/ProductFilterModel";
import { API_URL } from "./api";
import type { ProductResponseModel } from "../models/ProductResponseModel";

export class ProductService {
    private static readonly BASE_URL = API_URL + "/products";

    static async getProducts(
        filters?: ProductFilter,
    ): Promise<ProductResponseModel> {
        const params = new URLSearchParams();

        if (filters?.name) {
            params.append("name", filters.name);
        }

        if (filters?.category) {
            params.append("category", filters.category);
        }

        if (filters?.minPrice !== undefined) {
            params.append("price_gte", filters.minPrice.toString());
        }

        if (filters?.maxPrice !== undefined) {
            params.append("price_lte", filters.maxPrice.toString());
        }

        if (filters?.hasDiscount === true) {
            params.append("discount_gt", "0");
        }

        if (filters?.hasDiscount === false) {
            params.append("discount", "0");
        }

        if (filters?.limit !== undefined) {
            params.append("_limit", filters.limit.toString());
        }

        if (filters?.page !== undefined) {
            params.append("_page", filters.page.toString());
        }

        if (filters?.sortBy) {
            params.append("_sort", filters.sortBy);
        }

        if (filters?.order) {
            params.append("_order", filters.order);
        }

        const url = `${this.BASE_URL}?${params.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error loading products.");
        }

        const products: ProductModel[] = await response.json();

        const total = Number(response.headers.get("X-Total-Count"));

        const limit = filters?.limit ?? products.length;

        const page = filters?.page ?? 1;

        return {
            products,
            hasMore: page * limit < total,
        };
    }

    static async getProductById(id: number): Promise<ProductModel> {
        const response = await fetch(`${this.BASE_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Product not found.");
        }

        return response.json();
    }

    static async create(product: ProductModel): Promise<ProductModel> {
        const response = await fetch(this.BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Error creating product.");
        }

        return response.json();
    }

    static async update(
        id: number,
        product: ProductModel,
    ): Promise<ProductModel> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error("Error updating product.");
        }

        return response.json();
    }

    static async delete(id: number): Promise<void> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error deleting product.");
        }
    }

    static async getCategories(): Promise<string[]> {
        const response = await fetch(this.BASE_URL);

        if (!response.ok) {
            throw new Error("Error loading categories.");
        }

        const json = await response.json();
        const products = Array.isArray(json) ? json : (json.data ?? []);

        const categoriesSet = new Set<string>();
        products.forEach((p: ProductModel) => {
            const catName =
                typeof p.category === "string" ? p.category : p.category?.name;
            if (catName) {
                categoriesSet.add(catName);
            }
        });

        return Array.from(categoriesSet);
    }
}
