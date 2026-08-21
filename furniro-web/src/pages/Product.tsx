import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BreadcrumbProduct } from "../components/BreadcrumbProduct";
import { Container } from "../components/Container";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { ProductGallery } from "../components/ProductGallery";
import { ProductDetailsContainer } from "../components/product-details/ProductDetailsContainer";
import { ProductInfo } from "../components/product-details/ProductInfo";
import { useProduct } from "../hooks/get-product";
import { useProducts } from "../hooks/get-products";
import { useCartStore } from "../store/cartStore";

export function Product() {
    const { slug } = useParams();

    const { product, loading, error, refetch } = useProduct(slug);
    const addItem = useCartStore((state) => state.addItem);

    const categoryName =
        typeof product?.category === "string"
            ? product.category
            : product?.category?.name;

    const { products: related } = useProducts({
        category: categoryName,
        limit: 5,
    });

    const relatedProducts = related
        .filter((item) => item.id !== product?.id)
        .slice(0, 4);

    if (loading) {
        return (
            <Container className="py-24">
                <p className="font-poppins text-center text-base text-[#9F9F9F]">
                    Loading product...
                </p>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container className="flex flex-col items-center gap-6 py-24 text-center">
                <h1 className="font-poppins text-3xl font-semibold text-[#3A3A3A]">
                    Product not found
                </h1>
                <p className="font-poppins text-base text-[#9F9F9F]">
                    {error ?? "We could not load this product."}
                </p>
                <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="cursor-pointer bg-[#B88E2F] px-8 py-3 font-poppins text-base font-semibold text-white transition-colors hover:bg-[#A97C1A]"
                    >
                        Try again
                    </button>
                    <Link
                        to="/shop"
                        className="font-poppins text-base font-medium text-[#B88E2F] underline underline-offset-4 hover:opacity-80"
                    >
                        Back to shop
                    </Link>
                </div>
            </Container>
        );
    }

    return (
        <>
            <BreadcrumbProduct productName={product.name} />

            <Container className="py-10 lg:py-16">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
                    <div className="w-full min-w-0 lg:flex-1">
                        <ProductGallery product={product} />
                    </div>

                    <div className="w-full min-w-0 lg:flex-1">
                        <ProductDetailsContainer
                            product={product}
                            onAddToCart={({ variant, quantity }) => {
                                addItem(
                                    product,
                                    variant
                                        ? {
                                              id: variant.id,
                                              color: variant.color,
                                              size: variant.size,
                                              price: variant.price,
                                          }
                                        : null,
                                    quantity,
                                );
                                toast.success(`${product.name} added to cart!`);
                            }}
                        />
                    </div>
                </div>
            </Container>

            <div className="border-t border-[#D9D9D9]">
                <Container className="py-10 lg:py-14">
                    <ProductInfo product={product} />
                </Container>
            </div>

            <section className="border-t border-[#D9D9D9] py-14 lg:py-20">
                <Container>
                    <h2 className="mb-10 text-center font-poppins text-4xl font-medium text-black">
                        Related Products
                    </h2>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.length > 0
                            ? relatedProducts.map((item) => (
                                  <ProductCard key={item.id} product={item} />
                              ))
                            : Array.from({ length: 4 }).map((_, index) => (
                                  <ProductCardSkeleton key={index} />
                              ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <Link
                            to="/shop"
                            className="border border-[#B88E2F] px-16 py-3 font-poppins text-base font-semibold text-[#B88E2F] transition-colors hover:bg-[#B88E2F] hover:text-white"
                        >
                            Show More
                        </Link>
                    </div>
                </Container>
            </section>
        </>
    );
}
