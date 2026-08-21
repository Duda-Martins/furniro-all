interface ProductMainImageProps {
    src: string;
    alt?: string;
}

export function ProductMainImage({
    src,
    alt = "Expanded product image",
}: ProductMainImageProps) {
    return (
        <div className="w-full max-w-106.25 sm:w-auto sm:flex-1 sm:max-w-106.25 px-1 py-10 sm:py-16 bg-[#f9f1e7] rounded-[10px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
            <img
                src={src}
                alt={alt}
                className="w-full max-w-[90%] sm:w-96 h-64 sm:h-80 object-contain transition-all duration-300 ease-in-out"
            />
        </div>
    );
}
