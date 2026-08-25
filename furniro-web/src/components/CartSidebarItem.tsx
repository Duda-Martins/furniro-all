import { useNavigate } from "react-router-dom";

import { getUnitPrice, useCartStore } from "../store/cartStore";
import { formatPrice } from "../utils/formatPrice";

interface ItemProps {
    stateClose: () => void;
}

export function CartSidebarItem({ stateClose }: ItemProps) {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);

    const updateQuantity = useCartStore((state) => state.updateQuantity);

    const navigate = useNavigate();
    function handleShop() {
        navigate("/shop");
        stateClose();
    }

    return (
        <div className="overflow-y-auto">
            {items.length === 0 ? (
                <div className="flex flex-col items-center gap-6 py-16 text-center">
                    <p className="font-poppins text-xl text-[#9F9F9F]">
                        Your cart is empty.
                    </p>

                    <button
                        className="font-poppins text-base font-medium text-[#B88E2F] underline underline-offset-4 transition-opacity hover:opacity-80"
                        onClick={() => handleShop()}
                    >
                        Continue shopping
                    </button>
                </div>
            ) : (
                <div className="flex flex-col">
                    <ul className="flex flex-col gap-5">
                        {items.map((item) => {
                            const variantId = item.variant?.id ?? null;

                            return (
                                <li
                                    key={`${item.product.id}-${variantId ?? "default"}`}
                                    className="grid grid-cols-[80px_1fr_20px] items-center gap-3 md:grid-cols-[104px_1fr_24px] md:gap-4"
                                >
                                    <img
                                        src={`/img/products/${item.product.image}`}
                                        alt={item.product.name}
                                        className="h-25 w-25 rounded-[10px] bg-[#FBEBB5] object-cover"
                                    />

                                    <div className="flex min-w-0 flex-col justify-center gap-3">
                                        <span className="font-poppins text-base text-black">
                                            {item.product.name}
                                        </span>

                                        <div className="flex items-center gap-2 font-poppins text-sm">
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                value={item.quantity}
                                                aria-label={`Quantity for ${item.product.name}`}
                                                onChange={(event) => {
                                                    const value =
                                                        event.target.value;

                                                    if (
                                                        /^\d*$/.test(value) &&
                                                        value !== ""
                                                    ) {
                                                        updateQuantity(
                                                            item.product.id,
                                                            variantId,
                                                            Number(value),
                                                        );
                                                    }
                                                }}
                                                style={{
                                                    width: `${Math.max(item.quantity.toString().length, 1)}ch`,
                                                }}
                                                className="bg-transparent p-0 font-poppins text-sm text-black outline-none"
                                            />

                                            <span className="text-black font-light text-xs">
                                                x
                                            </span>

                                            <span className="text-[#B88E2F] font-poppins font-medium text-xs">
                                                {formatPrice(
                                                    getUnitPrice(item),
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        aria-label={`Remove ${item.product.name} from cart`}
                                        onClick={() =>
                                            removeItem(
                                                item.product.id,
                                                variantId,
                                            )
                                        }
                                        className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#9F9F9F] font-poppins text-xs font-semibold leading-none text-white transition-opacity hover:opacity-70"
                                    >
                                        ×
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}
