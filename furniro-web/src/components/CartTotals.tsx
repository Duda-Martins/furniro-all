import { formatPrice } from "../utils/formatPrice";
import { CartButton } from "./CartButton";

type CartTotalsProps = {
    subtotal: number;
    total: number;
    onCheckout: () => void;
    disabled?: boolean;
    className?: string;
};

export function CartTotals({
    subtotal,
    total,
    onCheckout,
    disabled = false,
    className = "",
}: CartTotalsProps) {
    return (
        <aside
            aria-labelledby="cart-totals-title"
            className={`flex flex-col items-center bg-[#FAF3EA] px-6 py-8 sm:px-16 ${className}`}
        >
            <h2
                id="cart-totals-title"
                className="mb-10 font-poppins text-3xl font-semibold text-black lg:mb-16"
            >
                Cart Totals
            </h2>

            <dl className="flex w-full flex-col gap-8">
                <div className="flex flex-row items-center justify-between gap-4">
                    <dt className="font-poppins text-base font-medium text-black">
                        Subtotal
                    </dt>
                    <dd className="font-poppins text-base text-[#9F9F9F]">
                        {formatPrice(subtotal)}
                    </dd>
                </div>

                <div className="flex flex-row items-center justify-between gap-4">
                    <dt className="font-poppins text-base font-medium text-black">
                        Total
                    </dt>
                    <dd className="font-poppins text-xl font-medium text-[#B88E2F]">
                        {formatPrice(total)}
                    </dd>
                </div>
            </dl>

            <CartButton
                text="Check Out"
                onClick={onCheckout}
                disabled={disabled}
                className="mt-10 w-full max-w-56"
            />
        </aside>
    );
}
