import type { ProductCategory } from "../../models/ProductCategory";

interface ProductDetailsListProps {
    sku?: string;
    category?: ProductCategory;
    tags?: string[];
}

export function ProductDetailsList({
    sku,
    category,
    tags,
}: ProductDetailsListProps) {
    const categoryName = category?.name;
    const tagsString = tags && tags.length > 0 ? tags.join(", ") : undefined;

    return (
        <div className="flex flex-col gap-3 text-base text-[#9F9F9F] font-poppins font-normal">
            {sku && (
                <div className="grid grid-cols-[100px_auto] items-center">
                    <span>SKU</span>
                    <span>: {sku}</span>
                </div>
            )}

            {categoryName && (
                <div className="grid grid-cols-[100px_auto] items-center">
                    <span>Category</span>
                    <span>: {categoryName}</span>
                </div>
            )}

            {tagsString && (
                <div className="grid grid-cols-[100px_auto] items-center">
                    <span>Tags</span>
                    <span>: {tagsString}</span>
                </div>
            )}

            <div className="grid grid-cols-[100px_auto] items-center">
                <span>Share</span>
                <div className="flex items-center gap-6 text-black">
                    <span className="text-[#9F9F9F] mr-[-16px]">:</span>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                            className="hover:scale-110 transition-transform"
                        >
                            <img
                                src="/icons/facebook.svg"
                                alt="Facebook"
                                className="w-5 h-5"
                            />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                            className="hover:scale-110 transition-transform"
                        >
                            <img
                                src="/icons/twitter.svg"
                                alt="Twitter"
                                className="w-5 h-5"
                            />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on LinkedIn"
                            className="hover:scale-110 transition-transform"
                        >
                            <img
                                src="/icons/linkedin.svg"
                                alt="LinkedIn"
                                className="w-5 h-5"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
