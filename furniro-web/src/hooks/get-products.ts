import { useState, useEffect, useCallback } from "react";
import type { ProductModel } from "../models/ProductModel";
import { api } from "../api/api";
import type { ProductFilter } from "../models/ProductFilterModel";

export const useProducts = (params?: ProductFilter) => {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cleanParams: Record<string, string> = {};
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                cleanParams[key] = String(value);
            }
        });
    }

    const queryParams = new URLSearchParams(cleanParams).toString();

    const fetchProducts = useCallback(
        async (signal?: AbortSignal) => {
            setLoading(true);
            setError(null);

            try {
                const endpoint = queryParams
                    ? `/products?${queryParams}`
                    : "/products";
                const response = await api(endpoint, { signal });
                const json = await response.json();

                const data: ProductModel[] = Array.isArray(json)
                    ? json
                    : (json.data ?? []);

                const totalCount: number = Array.isArray(json)
                    ? json.length
                    : (json.total ?? data.length);

                setProducts(data);
                setTotal(totalCount);
            } catch (err: unknown) {
                if (err instanceof Error && err.name === "AbortError") return;
                setError(
                    err instanceof Error
                        ? err.message
                        : "Error loading products.",
                );
            } finally {
                setLoading(false);
            }
        },
        [queryParams],
    );

    useEffect(() => {
        const controller = new AbortController();
        const endpoint = queryParams ? `/products?${queryParams}` : "/products";

        api(endpoint, { signal: controller.signal })
            .then(async (res) => {
                const json = await res.json();
                const data: ProductModel[] = Array.isArray(json)
                    ? json
                    : (json.data ?? []);

                const totalCount: number = Array.isArray(json)
                    ? json.length
                    : (json.total ?? data.length);

                if (!controller.signal.aborted) {
                    setProducts(data);
                    setTotal(totalCount);
                    setError(null);
                }
            })
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === "AbortError") return;
                if (!controller.signal.aborted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Error loading products.",
                    );
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [queryParams]);

    return { products, total, loading, error, refetch: fetchProducts };
};
