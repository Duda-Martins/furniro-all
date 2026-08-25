import { Link, useNavigate } from "react-router-dom";
import { BannerContainer } from "../components/BannerContainer";
import { CartTotals } from "../components/CartTotals";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";
import { Increaser } from "../components/Increaser";
import {
    getCartTotal,
    getSubtotal,
    getUnitPrice,
    useCartStore,
} from "../store/cartStore";
import type { CartItem } from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

function itemKey(item: CartItem) {
    return `${item.product.id}-${item.variant?.id ?? "base"}`;
}

export function Cart() {
    const navigate = useNavigate();
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const total = getCartTotal(items);

    function handleCheckout() {
        navigate("/checkout");
    }

    return (
        <>
            <BannerContainer
                title="Cart"
                crumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]}
            />

            <Container className="py-16 lg:py-20">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-6 py-16 text-center">
                        <p className="font-poppins text-xl text-[#9F9F9F]">
                            Your cart is empty.
                        </p>
                        <Link
                            to="/shop"
                            className="font-poppins text-base font-medium text-[#B88E2F] underline underline-offset-4 hover:opacity-80"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:gap-8">
                        <div className="w-full min-w-0 xl:flex-1">
                            <div className="hidden h-14 grid-cols-[112px_1.3fr_1.1fr_130px_1.1fr_40px] items-center gap-4 bg-[#FAF3EA] px-4 font-poppins text-base font-medium text-black md:grid">
                                <span aria-hidden="true" />
                                <span>Product</span>
                                <span>Price</span>
                                <span>Quantity</span>
                                <span>Subtotal</span>
                                <span aria-hidden="true" />
                            </div>

                            <ul className="flex flex-col gap-8 pt-8 md:gap-6">
                                {items.map((item) => {
                                    const variantId = item.variant?.id ?? null;

                                    return (
                                        <li
                                            key={itemKey(item)}
                                            className="grid grid-cols-[80px_1fr] items-center gap-4 md:grid-cols-[112px_1.3fr_1.1fr_130px_1.1fr_40px] md:px-4"
                                        >
                                            <img
                                                src={`/img/products/${item.product.image}`}
                                                alt={item.product.name}
                                                className="h-20 w-20 rounded-[10px] bg-[#FBEBB5] object-cover md:h-28 md:w-28"
                                            />

                                            <div className="flex flex-col gap-1 md:gap-0">
                                                <span className="font-poppins text-base text-[#9F9F9F]">
                                                    {item.product.name}
                                                </span>
                                                {item.variant && (
                                                    <span className="flex flex-row items-center gap-2 font-poppins text-sm text-[#9F9F9F]">
                                                        <span
                                                            aria-hidden="true"
                                                            className="inline-block h-3 w-3 rounded-full border border-black/10"
                                                            style={{
                                                                backgroundColor:
                                                                    item.variant
                                                                        .color,
                                                            }}
                                                        />
                                                        {item.variant.size}
                                                    </span>
                                                )}
                                                <span className="font-poppins text-base text-[#9F9F9F] md:hidden">
                                                    {formatPrice(
                                                        getUnitPrice(item),
                                                    )}
                                                </span>
                                            </div>

                                            <span className="hidden font-poppins text-base text-[#9F9F9F] md:block">
                                                {formatPrice(
                                                    getUnitPrice(item),
                                                )}
                                            </span>

                                            <div className="col-start-2 md:col-start-auto">
                                                <Increaser
                                                    value={item.quantity}
                                                    onChange={(quantity) =>
                                                        updateQuantity(
                                                            item.product.id,
                                                            variantId,
                                                            quantity,
                                                        )
                                                    }
                                                    label={`Quantity for ${item.product.name}`}
                                                />
                                            </div>

                                            <span className="col-start-2 font-poppins text-base text-black md:col-start-auto">
                                                {formatPrice(getSubtotal(item))}
                                            </span>

                                            <button
                                                type="button"
                                                aria-label={`Remove ${item.product.name} from cart`}
                                                onClick={() =>
                                                    removeItem(
                                                        item.product.id,
                                                        variantId,
                                                    )
                                                }
                                                className="col-start-2 w-fit cursor-pointer transition-opacity hover:opacity-70 md:col-start-auto md:justify-self-center"
                                            >
                                                <svg
                                                    width="28"
                                                    height="28"
                                                    viewBox="0 0 28 28"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M23.625 7H20.125V4.8125C20.125 3.84727 19.3402 3.0625 18.375 3.0625H9.625C8.65977 3.0625 7.875 3.84727 7.875 4.8125V7H4.375C3.89102 7 3.5 7.39102 3.5 7.875V8.75C3.5 8.87031 3.59844 8.96875 3.71875 8.96875H5.37031L6.0457 23.2695C6.08945 24.202 6.86055 24.9375 7.79297 24.9375H20.207C21.1422 24.9375 21.9105 24.2047 21.9543 23.2695L22.6297 8.96875H24.2812C24.4016 8.96875 24.5 8.87031 24.5 8.75V7.875C24.5 7.39102 24.109 7 23.625 7ZM18.1562 7H9.84375V5.03125H18.1562V7Z"
                                                        fill="#B88E2F"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <CartTotals
                            subtotal={total}
                            total={total}
                            onCheckout={handleCheckout}
                            className="w-full xl:w-96 xl:shrink-0"
                        />
                    </div>
                )}
            </Container>

            <FeaturesSection />
        </>
    );
}
