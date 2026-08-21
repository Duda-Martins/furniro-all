import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ProductModel } from "../models/ProductModel";

export type CartVariant = {
    id: number;
    color: string;
    size: string;
    price: number;
};

export type CartItem = {
    product: ProductModel;
    variant: CartVariant | null;
    quantity: number;
};

type CartStore = {
    items: CartItem[];
    addItem: (
        product: ProductModel,
        variant?: CartVariant | null,
        quantity?: number,
    ) => void;
    removeItem: (productId: number, variantId?: number | null) => void;
    updateQuantity: (
        productId: number,
        variantId: number | null,
        quantity: number,
    ) => void;
    clear: () => void;
};

function isSameItem(
    item: CartItem,
    productId: number,
    variantId: number | null,
) {
    return (
        item.product.id === productId && (item.variant?.id ?? null) === variantId
    );
}

export function getFullPrice(item: CartItem) {
    return item.variant?.price ?? item.product.price;
}

export function getUnitPrice(item: CartItem) {
    const discount = item.product.discount ?? 0;

    if (discount <= 0) {
        return getFullPrice(item);
    }

    return Math.round(getFullPrice(item) * (1 - discount / 100));
}

export function getSubtotal(item: CartItem) {
    return getUnitPrice(item) * item.quantity;
}

export function getCartTotal(items: CartItem[]) {
    return items.reduce((total, item) => total + getSubtotal(item), 0);
}

export function getCartCount(items: CartItem[]) {
    return items.reduce((count, item) => count + item.quantity, 0);
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            addItem: (product, variant = null, quantity = 1) =>
                set((state) => {
                    const amount = Math.max(1, Math.trunc(quantity));
                    const variantId = variant?.id ?? null;
                    const existing = state.items.find((item) =>
                        isSameItem(item, product.id, variantId),
                    );

                    if (!existing) {
                        return {
                            items: [...state.items, { product, variant, quantity: amount }],
                        };
                    }

                    return {
                        items: state.items.map((item) =>
                            isSameItem(item, product.id, variantId)
                                ? { ...item, quantity: item.quantity + amount }
                                : item,
                        ),
                    };
                }),

            removeItem: (productId, variantId = null) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => !isSameItem(item, productId, variantId ?? null),
                    ),
                })),

            updateQuantity: (productId, variantId, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        isSameItem(item, productId, variantId)
                            ? { ...item, quantity: Math.max(1, Math.trunc(quantity)) }
                            : item,
                    ),
                })),

            clear: () => set({ items: [] }),
        }),
        {
            name: "furniro-cart",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ items: state.items }),
        },
    ),
);
