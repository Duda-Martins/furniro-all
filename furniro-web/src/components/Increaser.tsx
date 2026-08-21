type IncreaserProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    className?: string;
};

export function Increaser({
    value,
    onChange,
    min = 1,
    max,
    label = "Quantity",
    className = "",
}: IncreaserProps) {
    const canDecrease = value > min;
    const canIncrease = max === undefined || value < max;

    const buttonClass =
        "flex h-full w-8 shrink-0 items-center justify-center text-base leading-none text-black transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

    return (
        <div
            role="group"
            aria-label={label}
            className={`inline-flex h-12 w-28 items-center justify-between overflow-hidden rounded-[10px] border border-[#9F9F9F] bg-white font-poppins ${className}`}
        >
            <button
                type="button"
                aria-label="Decrease quantity"
                disabled={!canDecrease}
                onClick={() => onChange(Math.max(min, value - 1))}
                className={buttonClass}
            >
                −
            </button>

            <span
                aria-live="polite"
                className="flex-1 text-center text-base font-medium text-black"
            >
                {value}
            </span>

            <button
                type="button"
                aria-label="Increase quantity"
                disabled={!canIncrease}
                onClick={() => onChange(value + 1)}
                className={buttonClass}
            >
                +
            </button>
        </div>
    );
}
