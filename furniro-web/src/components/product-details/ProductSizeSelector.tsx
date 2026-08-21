interface ProductSizeSelectorProps {
    sizes: string[];
    availableSizes?: string[];
    selectedSize: string;
    onSelectSize: (size: string) => void;
}

export function ProductSizeSelector({
    sizes,
    availableSizes,
    selectedSize,
    onSelectSize,
}: ProductSizeSelectorProps) {
    if (!sizes || sizes.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 font-poppins">
            <span className="text-sm text-[#9F9F9F]">Size</span>
            <div className="flex items-center gap-4">
                {sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    const isAvailable =
                        !availableSizes || availableSizes.includes(size);

                    return (
                        <button
                            key={size}
                            type="button"
                            onClick={() => onSelectSize(size)}
                            className={`w-7.5 h-7.5 rounded-[5px] text-xs font-normal flex items-center justify-center cursor-pointer transition-all duration-200 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B88E2F] ${
                                isSelected
                                    ? "bg-[#B88E2F] text-white shadow-sm"
                                    : "bg-[#F9F1E7] text-black hover:bg-[#F9F1E7]/80"
                            } ${isAvailable ? "" : "opacity-40"}`}
                            aria-label={
                                isAvailable
                                    ? `Select size ${size}`
                                    : `Size ${size}, not available in the selected color`
                            }
                            aria-pressed={isSelected}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
