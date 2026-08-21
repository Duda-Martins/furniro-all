import { formatPrice } from "../../utils/formatPrice";

interface ProductSummaryProps {
    name: string;
    price: number;
    description: string;
    discount?: number | null;
    rating?: number;
    reviewCount?: number;
}

export function ProductSummary({
    name,
    price,
    description,
    discount,
    rating = 4.5,
    reviewCount = 5,
}: ProductSummaryProps) {
    const safeDiscount = discount ?? 0;

    const finalPrice =
        safeDiscount > 0 ? Math.round(price * (1 - safeDiscount / 100)) : price;

    const stars = Array.from({ length: 5 }, (_, index) => {
        const position = index + 1;

        if (rating >= position) {
            return "full";
        }

        return rating >= position - 0.5 ? "half" : "empty";
    });

    return (
        <div className="flex flex-col gap-3 font-poppins">
            <h1 className="text-3xl sm:text-5xl font-normal text-black leading-tight">
                {name}
            </h1>

            <div className="flex flex-row flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-xl sm:text-2xl font-medium text-[#9F9F9F]">
                    {formatPrice(finalPrice)}
                </p>

                {safeDiscount > 0 && (
                    <p className="text-base font-normal text-[#B0B0B0] line-through">
                        {formatPrice(price)}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-4 py-1">
                <div
                    className="flex items-center gap-1.5"
                    role="img"
                    aria-label={`Rating: ${rating} out of 5`}
                >
                    {stars.map((star, index) =>
                        star === "empty" ? null : (
                            <img
                                key={index}
                                src={
                                    star === "full"
                                        ? "/icons/dashicons_star-filled.svg"
                                        : "/icons/carbon_star-half.svg"
                                }
                                alt=""
                                aria-hidden="true"
                                className="w-5 h-5"
                            />
                        ),
                    )}
                </div>
                <div className="h-8 border-r border-[#9F9F9F]" />
                <span className="text-xs text-[#9F9F9F] font-normal">
                    {reviewCount} Customer Review
                </span>
            </div>

            <p className="text-[13px] text-black font-normal leading-relaxed max-w-106 mt-1">
                {description}
            </p>
        </div>
    );
}
