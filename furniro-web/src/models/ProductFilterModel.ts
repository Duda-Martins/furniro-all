export type ProductFilter = {
    name?: string;

    category?: string;

    minPrice?: number;
    maxPrice?: number;

    hasDiscount?: boolean;

    page?: number;
    limit?: number;

    sortBy?: "price" | "name" | "postedAt";
    order?: "asc" | "desc";
};