import { useState } from "react";
import type { ProductDetailModel } from "../../models/ProductDetailModel";
import { productImageSrc } from "../../utils/productImage";

interface ProductInfoProps {
    product?: ProductDetailModel;
    fullDescription?: string;
    additionalInformation?: string;
    showcaseImages?: string[];
}

export function ProductInfo({
    product,
    fullDescription = product?.fullDescription,
    additionalInformation = product?.additionalInformation,
    showcaseImages = product?.images ?? undefined,
}: ProductInfoProps) {
    const [activeTab, setActiveTab] = useState<"description" | "additional">(
        "description"
    );

    const descriptionText = fullDescription || product?.description || "";
    const infoText = additionalInformation || "";

    const activeContent = activeTab === "description" ? descriptionText : infoText;

    const showcase = (showcaseImages ?? []).slice(0, 2).map(productImageSrc);

    if (!descriptionText && !infoText) {
        return null;
    }

    return (
        <div className="w-full max-w-256.5 mx-auto flex flex-col justify-start items-center gap-9 font-poppins py-8 px-4 select-none">
            <div
                role="tablist"
                className="flex flex-row justify-center items-center gap-8 sm:gap-16 md:gap-32 flex-wrap"
            >
                <button
                    type="button"
                    role="tab"
                    id="tab-description"
                    aria-controls="product-info-panel"
                    onClick={() => setActiveTab("description")}
                    aria-selected={activeTab === "description"}
                    className={`text-2xl cursor-pointer transition-colors ${
                        activeTab === "description"
                            ? "text-black font-medium"
                            : "text-[#9F9F9F] font-normal hover:text-black"
                    }`}
                >
                    Description
                </button>

                <button
                    type="button"
                    role="tab"
                    id="tab-additional"
                    aria-controls="product-info-panel"
                    onClick={() => setActiveTab("additional")}
                    aria-selected={activeTab === "additional"}
                    className={`text-2xl cursor-pointer transition-colors ${
                        activeTab === "additional"
                            ? "text-black font-medium"
                            : "text-[#9F9F9F] font-normal hover:text-black"
                    }`}
                >
                    Additional Information
                </button>
            </div>

            <div
                role="tabpanel"
                id="product-info-panel"
                aria-labelledby={
                    activeTab === "description"
                        ? "tab-description"
                        : "tab-additional"
                }
                className="w-full flex flex-col justify-start items-start gap-7"
            >
                {activeContent ? (
                    <p className="w-full text-justify text-[#9F9F9F] text-base font-normal leading-relaxed whitespace-pre-line">
                        {activeContent}
                    </p>
                ) : (
                    <p className="w-full text-center text-[#9F9F9F] text-base font-normal py-4">
                        No details available.
                    </p>
                )}

                {activeTab === "description" && showcase.length === 2 && (
                    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                        {showcase.map((image, index) => (
                            <div
                                key={image}
                                className="flex items-center justify-center overflow-hidden rounded-[10px] bg-[#FFF9E5] px-6 py-10 sm:py-14"
                            >
                                <img
                                    src={image}
                                    alt={`${product?.name ?? "Product"} showcase ${index + 1}`}
                                    className="h-40 w-full object-contain sm:h-52"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
