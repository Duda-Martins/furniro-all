import { useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { BannerContainer } from "../components/BannerContainer";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";
import { FilterBar } from "../components/FilterBar";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { Pagination } from "../components/Pagination";
import { useProducts } from "../hooks/get-products";

export function Shop() {
    const { category: urlCategory } = useParams();

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(16);
    const [selectedCategory, setSelectedCategory] = useState<string>(
        urlCategory || "",
    );
    const [sortBy, setSortBy] = useState<string>("default");

    const [prevUrlCategory, setPrevUrlCategory] = useState<string | undefined>(
        urlCategory,
    );

    if (urlCategory !== prevUrlCategory) {
        setPrevUrlCategory(urlCategory);
        setSelectedCategory(urlCategory || "");
        setPage(1);
    }

    const { sortByParam, orderParam } = useMemo(() => {
        if (sortBy === "price-asc") {
            return {
                sortByParam: "price" as const,
                orderParam: "asc" as const,
            };
        }
        if (sortBy === "price-desc") {
            return {
                sortByParam: "price" as const,
                orderParam: "desc" as const,
            };
        }
        if (sortBy === "newest") {
            return {
                sortByParam: "postedAt" as const,
                orderParam: "desc" as const,
            };
        }
        return { sortByParam: undefined, orderParam: undefined };
    }, [sortBy]);

    const categoryParam = useMemo(() => {
        return selectedCategory && selectedCategory !== "all"
            ? selectedCategory
            : undefined;
    }, [selectedCategory]);

    const filterParams = useMemo(
        () => ({
            page,
            limit,
            category: categoryParam,
            sortBy: sortByParam,
            order: orderParam,
        }),
        [page, limit, categoryParam, sortByParam, orderParam],
    );

    const { products, total, loading, error, refetch } =
        useProducts(filterParams);

    const totalPages = useMemo(
        () => Math.ceil(total / limit) || 1,
        [total, limit],
    );
    const showingStart = useMemo(
        () => (total > 0 ? (page - 1) * limit + 1 : 0),
        [total, page, limit],
    );
    const showingEnd = useMemo(
        () => Math.min(page * limit, total),
        [page, limit, total],
    );

    const handleCategoryChange = useCallback((cat: string) => {
        setSelectedCategory(cat);
        setPage(1);
    }, []);

    const handleSortByChange = useCallback((sort: string) => {
        setSortBy(sort);
        setPage(1);
    }, []);

    const handleItemsPerPageChange = useCallback((newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    }, []);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <BannerContainer
                title="Shop"
                crumbs={[{ label: "Home", to: "/" }, { label: "Shop" }]}
            />

            <FilterBar
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
                itemsPerPage={limit}
                onItemsPerPageChange={handleItemsPerPageChange}
                showingStart={showingStart}
                showingEnd={showingEnd}
                totalResults={total}
            />

            <section className="py-12 md:py-16" aria-label="Product listing">
                <Container>
                    {loading && (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: limit }).map((_, index) => (
                                <ProductCardSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {!loading && error && (
                        <div className="bg-[#FFF3E3] border border-[#B88E2F]/20 p-8 sm:p-12 text-center max-w-xl mx-auto rounded-none shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#B88E2F]/10 mb-4">
                                <svg
                                    className="h-8 w-8 text-[#B88E2F]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-poppins text-2xl font-bold text-[#3A3A3A] mb-2">
                                Não foi possível carregar os produtos
                            </h3>
                            <p className="font-poppins text-[#898989] text-base mb-6">
                                {error}
                            </p>
                            <button
                                type="button"
                                onClick={() => refetch()}
                                className="cursor-pointer font-poppins bg-[#B88E2F] hover:bg-[#A97C1A] text-white font-semibold text-base px-8 py-3 transition-colors"
                            >
                                Tentar novamente
                            </button>
                        </div>
                    )}

                    {!loading && !error && products.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="font-poppins text-2xl font-semibold text-[#3A3A3A] mb-2">
                                Nenhum produto encontrado
                            </h3>
                            <p className="font-poppins text-[#898989] text-base">
                                Tente alterar os filtros de categoria ou
                                ordenação.
                            </p>
                        </div>
                    )}

                    {!loading && !error && products.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-16 flex justify-center">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </Container>
            </section>

            <FeaturesSection />
        </div>
    );
}
