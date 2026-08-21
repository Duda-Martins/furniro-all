import {
    useEffect,
    useState,
    type ComponentProps,
    type ChangeEvent,
} from "react";
import { Container } from "./Container";
import { ProductService } from "../services/ProductService";

export interface SortOption {
    value: string;
    label: string;
}

export interface FilterBarProps extends ComponentProps<"div"> {
    showingStart?: number;
    showingEnd?: number;
    totalResults?: number;
    itemsPerPage?: number;
    onItemsPerPageChange?: (value: number) => void;
    selectedCategory?: string;
    onCategoryChange?: (category: string) => void;
    sortBy?: string;
    onSortByChange?: (sort: string) => void;
    categories?: string[];
    sortOptions?: SortOption[];
}

const DEFAULT_SORT_OPTIONS: SortOption[] = [
    { value: "default", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
];

export function FilterBar({
    showingStart = 1,
    showingEnd = 16,
    totalResults = 32,
    itemsPerPage = 16,
    onItemsPerPageChange,
    selectedCategory = "",
    onCategoryChange,
    sortBy = "default",
    onSortByChange,
    categories: categoriesProp,
    sortOptions = DEFAULT_SORT_OPTIONS,
    className = "",
    ...props
}: FilterBarProps) {
    const [fetchedCategories, setFetchedCategories] = useState<string[]>([]);

    const hasCategoriesProp = categoriesProp !== undefined;

    const categories = hasCategoriesProp
        ? categoriesProp
        : fetchedCategories;

    useEffect(() => {
        if (hasCategoriesProp) {
            return;
        }

        let active = true;

        ProductService.getCategories()
            .then((data) => {
                if (active) {
                    setFetchedCategories(data);
                }
            })
            .catch((error) => {
                console.error("Error loading categories.", error);

                if (active) {
                    setFetchedCategories([]);
                }
            });

        return () => {
            active = false;
        };
    }, [hasCategoriesProp]);

    function handleShowChange(e: ChangeEvent<HTMLInputElement>) {
        const val = Number(e.target.value);
        if (!isNaN(val) && val > 0) {
            onItemsPerPageChange?.(val);
        }
    }

    return (
        <div
            className={`w-full bg-[#F9F1E7] min-h-24 py-4 sm:py-6 flex items-center overflow-hidden ${className}`}
            {...props}
        >
            <Container className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 w-full max-w-full">
                <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto min-w-0">
                    <div className="relative flex items-center gap-3.5 cursor-pointer">
                        <img
                            src="/icons/filter.svg"
                            alt=""
                            aria-hidden="true"
                            className="w-5 h-5 object-contain"
                        />
                        <span className="font-poppins text-black text-lg sm:text-xl font-normal whitespace-nowrap">
                            {selectedCategory === "all" || !selectedCategory
                                ? "Filter"
                                : selectedCategory}
                        </span>
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange?.(e.target.value)}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            aria-label="Filter options"
                        >
                            <option value="">Filter</option>
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        aria-label="Grid view"
                        className="cursor-pointer opacity-100 hover:opacity-75 transition-opacity"
                    >
                        <img
                            src="/icons/gridView.svg"
                            alt=""
                            aria-hidden="true"
                            className="w-4 h-4 object-contain"
                        />
                    </button>

                    <button
                        type="button"
                        aria-label="List view"
                        className="cursor-pointer opacity-100 hover:opacity-75 transition-opacity"
                    >
                        <img
                            src="/icons/listView.svg"
                            alt=""
                            aria-hidden="true"
                            className="w-5 h-4 object-contain"
                        />
                    </button>

                    <div
                        className="w-0.5 h-9 bg-[#9F9F9F] hidden sm:block"
                        aria-hidden="true"
                    />

                    <p className="font-poppins text-black text-sm sm:text-base font-normal text-left">
                        Showing {showingStart}–{showingEnd} of {totalResults}{" "}
                        results
                    </p>
                </div>

                <div className="flex flex-row flex-wrap items-center justify-start lg:justify-end gap-4 sm:gap-6 w-full lg:w-auto">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <label
                            htmlFor="show-count"
                            className="font-poppins text-black text-lg sm:text-xl font-normal"
                        >
                            Show
                        </label>
                        <input
                            id="show-count"
                            type="number"
                            min="1"
                            value={itemsPerPage}
                            onChange={handleShowChange}
                            className="w-14 h-12 sm:h-14 bg-white text-[#9F9F9F] focus:text-black active:text-black font-poppins text-lg sm:text-xl font-normal text-center outline-none border-none focus:ring-1 focus:ring-[#B88E2F] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4 sm:flex-none">
                        <label
                            htmlFor="sort-by"
                            className="font-poppins text-black text-lg sm:text-xl font-normal whitespace-nowrap"
                        >
                            Sort by
                        </label>
                        <div className="relative w-full sm:w-48">
                            <select
                                id="sort-by"
                                value={sortBy}
                                onChange={(e) =>
                                    onSortByChange?.(e.target.value)
                                }
                                className="w-full sm:w-48 h-12 sm:h-14 px-4 sm:px-6 bg-white text-[#9F9F9F] focus:text-black font-poppins text-base sm:text-xl font-normal outline-none cursor-pointer border-none appearance-none pr-10 focus:ring-1 focus:ring-[#B88E2F]"
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            <svg
                                className="w-4 h-4 text-[#9F9F9F] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
