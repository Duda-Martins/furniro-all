import { useState } from "react";
import type { ProductDetailModel } from "../../models/ProductDetailModel";
import type { ProductVariantModel } from "../../models/ProductVariantModel";
import { ProductSummary } from "./ProductSummary";
import { ProductSizeSelector } from "./ProductSizeSelector";
import { ProductColorSelector } from "./ProductColorSelector";
import { ProductActions } from "./ProductActions";
import { ProductDivider } from "./ProductDivider";
import { ProductDetailsList } from "./ProductDetailsList";

interface ProductDetailsContainerProps {
    product: ProductDetailModel;
    onAddToCart?: (payload: {
        product: ProductDetailModel;
        variant: ProductVariantModel | null;
        size: string;
        color: string;
        quantity: number;
    }) => void;
}

export function ProductDetailsContainer({
    product,
    onAddToCart,
}: ProductDetailsContainerProps) {
    const variants = product.variants ?? [];

    const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)));
    const colors = Array.from(new Set(variants.map((v) => v.color).filter(Boolean)));

    const [selectedSize, setSelectedSize] = useState<string>(
        variants[0]?.size ?? "",
    );
    const [selectedColor, setSelectedColor] = useState<string>(
        variants[0]?.color ?? "",
    );
    const [quantity, setQuantity] = useState<number>(1);

    const selectedVariant =
        variants.find(
            (v) => v.size === selectedSize && v.color === selectedColor,
        ) ?? null;

    const availableColors = colors.filter((color) =>
        variants.some((v) => v.size === selectedSize && v.color === color),
    );

    const availableSizes = sizes.filter((size) =>
        variants.some((v) => v.color === selectedColor && v.size === size),
    );

    function handleSelectSize(size: string) {
        setSelectedSize(size);

        const stillValid = variants.some(
            (v) => v.size === size && v.color === selectedColor,
        );

        if (!stillValid) {
            const fallback = variants.find((v) => v.size === size);

            if (fallback) {
                setSelectedColor(fallback.color);
            }
        }
    }

    function handleSelectColor(color: string) {
        setSelectedColor(color);

        const stillValid = variants.some(
            (v) => v.color === color && v.size === selectedSize,
        );

        if (!stillValid) {
            const fallback = variants.find((v) => v.color === color);

            if (fallback) {
                setSelectedSize(fallback.size);
            }
        }
    }

    function handleAddToCart() {
        onAddToCart?.({
            product,
            variant: selectedVariant,
            size: selectedSize,
            color: selectedColor,
            quantity,
        });
    }

    return (
        <div className="flex flex-col gap-7 w-full max-w-150 select-none">
            <ProductSummary
                name={product.name}
                price={selectedVariant?.price ?? product.price}
                discount={product.discount}
                description={product.description}
            />

            {sizes.length > 0 && (
                <ProductSizeSelector
                    sizes={sizes}
                    availableSizes={availableSizes}
                    selectedSize={selectedSize}
                    onSelectSize={handleSelectSize}
                />
            )}

            {colors.length > 0 && (
                <ProductColorSelector
                    colors={colors}
                    availableColors={availableColors}
                    selectedColor={selectedColor}
                    onSelectColor={handleSelectColor}
                />
            )}

            <ProductActions
                quantity={quantity}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
            />

            <ProductDivider />

            <ProductDetailsList sku={product.sku} category={product.category} />
        </div>
    );
}
