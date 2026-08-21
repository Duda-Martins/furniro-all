import { useState } from "react";
import type { ProductDetailModel } from "../models/ProductDetailModel";
import { productImageSrc } from "../utils/productImage";
import { ProductImageThumbnail } from "./ProductImageThumbnail";
import { ProductMainImage } from "./ProductMainImage";

interface ProductGalleryProps {
    product?: ProductDetailModel;
    images?: ProductDetailModel["images"];
    productName?: string;
}

export function ProductGallery({
    product,
    images = product?.images,
    productName = product?.name ?? "Product",
}: ProductGalleryProps) {
    const rawImages = images ?? product?.images;
    const imageList = (
        rawImages && rawImages.length > 0
            ? rawImages
            : product?.image
              ? [product.image]
              : []
    ).map(productImageSrc);

    const [clickedImage, setClickedImage] = useState<string | null>(null);

    const selectedImage =
        clickedImage && imageList.includes(clickedImage)
            ? clickedImage
            : (imageList[0] ?? "");

    if (imageList.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-full flex flex-col sm:flex-row justify-center lg:justify-start items-center sm:items-start gap-4 sm:gap-8 select-none">
            {/* List of thumbnails (vertical on desktop, horizontal on mobile) */}
            <div className="w-full sm:w-20 flex sm:flex-col justify-start items-center sm:items-start gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible py-1 px-1 max-w-full">
                {imageList.map((img, index) => (
                    <ProductImageThumbnail
                        key={`${img}-${index}`}
                        src={img}
                        alt={`${productName} thumbnail ${index + 1}`}
                        isSelected={img === selectedImage}
                        onClick={() => setClickedImage(img)}
                    />
                ))}
            </div>

            <ProductMainImage
                src={selectedImage}
                alt={`${productName} expanded image`}
            />
        </div>
    );
}
