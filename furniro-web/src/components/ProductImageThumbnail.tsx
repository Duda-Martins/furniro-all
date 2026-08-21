interface ProductImageThumbnailProps {
    src: string;
    alt?: string;
    onClick?: () => void;
    isSelected?: boolean;
}

export function ProductImageThumbnail({
    src,
    alt = "Product thumbnail",
    onClick,
    isSelected = false,
}: ProductImageThumbnailProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isSelected}
            className={`w-20 h-20 bg-[#f9f1e7] rounded-[10px] flex items-center justify-center p-2 cursor-pointer transition-all duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B88E2F] shrink-0 ${
                isSelected
                    ? "border-2 border-[#b88e2f]"
                    : "border border-transparent hover:border-[#b88e2f]/40"
            }`}
        >
            <img
                src={src}
                alt={alt}
                className="max-w-full max-h-full object-contain"
            />
        </button>
    );
}
