import { CartButton } from "../CartButton";
import { Increaser } from "../Increaser";

interface ProductActionsProps {
    quantity: number;
    onQuantityChange: (value: number) => void;
    onAddToCart: () => void;
}

export function ProductActions({
    quantity,
    onQuantityChange,
    onAddToCart,
}: ProductActionsProps) {
    return (
        <div className="flex flex-row items-center gap-3 sm:gap-5 flex-wrap">
            <Increaser
                value={quantity}
                onChange={onQuantityChange}
                className="w-30.75 h-16"
            />
            <CartButton
                text="Add To Cart"
                className="min-w-53.75 h-16 px-12 rounded-[15px] border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all text-xl font-normal font-poppins inline-flex justify-center items-center cursor-pointer shadow-none outline-none"
                onClick={onAddToCart}
            />
        </div>
    );
}
