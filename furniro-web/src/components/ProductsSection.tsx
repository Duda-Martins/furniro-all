import { Link } from "react-router-dom";
import type { ProductModel } from "../models/ProductModel";
import { useProducts } from "../hooks/get-products";
import { Container } from "./Container";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useState } from "react";
import { scrollToTop } from "../utils/scrollToTop";

export function ProductsSection() {
    const productsQuantity = 8;

    const [page] = useState(1);
    const [allProducts, setAllProducts] = useState<ProductModel[]>([]);
    const [prevProducts, setPrevProducts] = useState<ProductModel[]>([]);

    const { products, loading, error, refetch } = useProducts({
        page,
        limit: productsQuantity,
    });

    if (products !== prevProducts) {
        setPrevProducts(products);
        if (products.length > 0) {
            const existingIds = new Set(allProducts.map((p) => p.id));
            const newProducts = products.filter((p) => !existingIds.has(p.id));
            if (newProducts.length > 0) {
                setAllProducts((prev) => [...prev, ...newProducts]);
            }
        }
    }

    return (
        <section className="bg-white pt-10 pb-16">
            <Container>
                <h2 className="font-poppins text-[#3a3a3a] text-4xl font-bold text-center mb-10">
                    Our Products
                </h2>

                {loading && allProducts.length === 0 && (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: productsQuantity }).map(
                            (_, index) => (
                                <ProductCardSkeleton key={index} />
                            ),
                        )}
                    </div>
                )}

                {!loading && error && allProducts.length === 0 && (
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
                            Could not load the products
                        </h3>
                        <p className="font-poppins text-[#898989] text-base mb-6">
                            {error ||
                                "An error occurred while fetching the product catalog."}
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="cursor-pointer font-poppins bg-[#B88E2F] hover:bg-[#A97C1A] text-white font-semibold text-base px-8 py-3 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {allProducts.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {allProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <Link
                                to="/shop"
                                onClick={scrollToTop}
                                className="cursor-pointer font-poppins bg-white text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white font-semibold text-base border border-[#B88E2F] px-20 py-3 transition-colors flex items-center justify-center gap-2"
                            >
                                Show More
                            </Link>
                        </div>
                    </>
                )}
            </Container>
        </section>
    );
}
