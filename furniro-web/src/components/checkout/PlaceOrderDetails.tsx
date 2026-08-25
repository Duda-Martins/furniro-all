import { useFormContext, useWatch } from "react-hook-form";

import type { CheckoutFormData } from "../../schemas/checkout.schema";

import { getSubtotal, getCartTotal, useCartStore } from "../../store/cartStore";
import { formatPrice } from "../../utils/formatPrice";

interface PlaceOrderDetailsProps {
    isSubmitting: boolean;
}

export function PlaceOrderDetails({ isSubmitting }: PlaceOrderDetailsProps) {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<CheckoutFormData>();

    const selectedPaymentMethod = useWatch({
        control,
        name: "paymentMethod",
    });

    const items = useCartStore((state) => state.items);

    const total = getCartTotal(items);

    const paymentDescriptions = {
        "direct-bank-transfer":
            "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",

        "cash-on-delivery":
            "Pay with cash when your order is delivered to your address. Please make sure to have the exact amount available at the time of delivery.",
    };

    return (
        <section className="w-full">
            <div className="flex items-center justify-between">
                <h3 className="font-poppins text-2xl font-medium">Product</h3>

                <h3 className="font-poppins text-2xl font-medium">Subtotal</h3>
            </div>

            <div className="mt-6 space-y-4">
                {items.map((item) => {
                    const unitPrice = getSubtotal(item);

                    return (
                        <div
                            key={`${item.product.id}`}
                            className="flex items-start justify-between"
                        >
                            <div className="flex flex-col">
                                <span className="font-poppins text-base text-[#9F9F9F]">
                                    {item.product.name}{" "}
                                    <span className="text-black">
                                        x {item.quantity}
                                    </span>
                                </span>
                            </div>

                            <span className="font-poppins text-base font-light text-black">
                                {formatPrice(unitPrice)}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 flex items-center justify-between">
                <span className="font-poppins text-base">Subtotal</span>

                <span className="font-poppins text-base font-light text-black">
                    {formatPrice(total)}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className="font-poppins text-base">Total</span>

                <span className="font-poppins text-2xl font-bold text-[#B88E2F]">
                    {formatPrice(total)}
                </span>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-5">
                <div className="space-y-4">
                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            {...register("paymentMethod")}
                            type="radio"
                            value="direct-bank-transfer"
                            className="peer sr-only"
                        />

                        <span className="h-3 w-3 rounded-full border border-black peer-checked:bg-black" />

                        <span
                            className={
                                selectedPaymentMethod === "direct-bank-transfer"
                                    ? "font-poppins text-base"
                                    : "font-poppins text-base font-light text-gray-400"
                            }
                        >
                            Direct Bank Transfer
                        </span>
                    </label>

                    {selectedPaymentMethod === "direct-bank-transfer" && (
                        <p className="text-base font-light text-gray-400">
                            {paymentDescriptions["direct-bank-transfer"]}
                        </p>
                    )}

                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            {...register("paymentMethod")}
                            type="radio"
                            value="cash-on-delivery"
                            className="peer sr-only"
                        />

                        <span className="h-3 w-3 rounded-full border border-black peer-checked:bg-black" />

                        <span
                            className={
                                selectedPaymentMethod === "cash-on-delivery"
                                    ? "font-poppins text-base"
                                    : "font-poppins text-base font-light text-gray-400"
                            }
                        >
                            Cash On Delivery
                        </span>
                    </label>

                    {selectedPaymentMethod === "cash-on-delivery" && (
                        <p className="text-base font-light text-gray-400">
                            {paymentDescriptions["cash-on-delivery"]}
                        </p>
                    )}
                </div>

                {errors.paymentMethod && (
                    <p className="mt-2 text-base text-red-500">
                        {errors.paymentMethod.message}
                    </p>
                )}
            </div>

            <p className="mt-6 text-base font-light text-black">
                Your personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our{" "}
                <a href="#" className="font-semibold text-black">
                    privacy policy
                </a>
                .
            </p>

            <div className="mt-8 flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="checkout-submit"
                >
                    {isSubmitting ? "Placing Order..." : "Place order"}
                </button>
            </div>
        </section>
    );
}
