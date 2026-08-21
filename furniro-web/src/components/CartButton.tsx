import type { ComponentProps, MouseEvent } from "react";
import { toast } from "react-toastify";

interface CartButtonProps extends ComponentProps<"button"> {
    children?: React.ReactNode;
    text?: string;
    toastText?: string;
}

export function CartButton({
    children,
    text = "Add To Cart",
    toastText,
    type = "button",
    className = "",
    onClick,
    ...props
}: CartButtonProps) {
    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        if (toastText) {
            toast.success(toastText);
        }
        if (onClick) {
            onClick(e);
        }
    }

    return (
        <button
            type={type}
            className={`px-12 py-4 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 select-none ${className}`}
            onClick={handleClick}
            {...props}
        >
            <span className="justify-start text-current text-xl font-normal font-poppins">
                {children || text}
            </span>
        </button>
    );
}
