import type { ComponentProps } from "react";
import { scrollToTop } from "../utils/scrollToTop";

interface PaginationProps extends ComponentProps<"nav"> {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
    ...props
}: PaginationProps) {
    function handlePageClick(page: number) {
        onPageChange(page);
        scrollToTop();
    }

    function getVisiblePages(): (number | string)[] {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const visible: (number | string)[] = [];

        visible.push(1);

        if (currentPage > 3) {
            visible.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            visible.push(i);
        }

        if (currentPage < totalPages - 2) {
            visible.push("...");
        }

        if (totalPages > 1 && !visible.includes(totalPages)) {
            visible.push(totalPages);
        }

        return visible;
    }

    const visiblePages = getVisiblePages();

    return (
        <nav
            aria-label="Pagination"
            className={`flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-9 select-none max-w-full px-2 ${className}`}
            {...props}
        >
            {visiblePages.map((item, index) => {
                if (typeof item === "string") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className="w-8 h-10 sm:w-14 sm:h-14 flex items-center justify-center font-poppins text-base sm:text-xl text-[#9F9F9F]"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = item === currentPage;

                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => handlePageClick(item)}
                        aria-current={isActive ? "page" : undefined}
                        aria-label={`Page ${item}`}
                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-[10px] flex items-center justify-center font-poppins text-base sm:text-xl font-normal transition-colors cursor-pointer ${
                            isActive
                                ? "bg-[#B88E2F] text-white"
                                : "bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white"
                        }`}
                    >
                        {item}
                    </button>
                );
            })}

            {currentPage < totalPages && (
                <button
                    type="button"
                    onClick={() => handlePageClick(currentPage + 1)}
                    aria-label="Next page"
                    className="h-10 sm:h-14 px-4 sm:px-7 rounded-[10px] bg-[#F9F1E7] text-black hover:bg-[#B88E2F] hover:text-white font-poppins text-base sm:text-xl font-light flex items-center justify-center transition-colors cursor-pointer"
                >
                    Next
                </button>
            )}
        </nav>
    );
}
