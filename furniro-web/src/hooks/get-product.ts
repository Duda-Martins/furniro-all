import { useCallback, useEffect, useRef, useState } from "react";

import type { ProductDetailModel } from "../models/ProductDetailModel";
import { api } from "../api/api";

interface UseProductReturn {
    product: ProductDetailModel | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useProduct = (id?: number | string): UseProductReturn => {
    const [product, setProduct] = useState<ProductDetailModel | null>(null);
    const [loading, setLoading] = useState<boolean>(Boolean(id));
    const [error, setError] = useState<string | null>(null);

    const controllerRef = useRef<AbortController | null>(null);

    const fetchProduct = useCallback(async (): Promise<void> => {
        if (!id) return;

        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const response = await api(
                `/products/${encodeURIComponent(String(id))}/slug`,
                {
                    signal: controller.signal,
                },
            );

            const data = (await response.json()) as ProductDetailModel;

            if (controller.signal.aborted) return;

            setProduct(data);
        } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") return;

            setProduct(null);

            const message =
                err instanceof Error
                    ? err.message
                    : "Product not found.";

            setError(message);
        } finally {
            if (!controller.signal.aborted) setLoading(false);

            if (controllerRef.current === controller)
                controllerRef.current = null;
        }
    }, [id]);

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        controllerRef.current = controller;

        api(`/products/${encodeURIComponent(String(id))}/slug`, {
            signal: controller.signal,
        })
            .then(async (res) => {
                const data = (await res.json()) as ProductDetailModel;
                if (!controller.signal.aborted) {
                    setProduct(data);
                    setError(null);
                }
            })
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === "AbortError") return;
                if (!controller.signal.aborted) {
                    setProduct(null);
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Product not found.",
                    );
                }
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
                if (controllerRef.current === controller)
                    controllerRef.current = null;
            });

        return () => {
            controller.abort();
        };
    }, [id]);

    return {
        product,
        loading,
        error,
        refetch: fetchProduct,
    };
};
