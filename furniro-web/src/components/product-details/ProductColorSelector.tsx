interface ProductColorSelectorProps {
    colors: string[];
    availableColors?: string[];
    selectedColor: string;
    onSelectColor: (color: string) => void;
}

export function ProductColorSelector({
    colors,
    availableColors,
    selectedColor,
    onSelectColor,
}: ProductColorSelectorProps) {
    if (!colors || colors.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 font-poppins">
            <span className="text-sm text-[#9F9F9F]">Color</span>
            <div className="flex items-center gap-4">
                {colors.map((color) => {
                    const isSelected = selectedColor === color;
                    const isAvailable =
                        !availableColors || availableColors.includes(color);

                    return (
                        <button
                            key={color}
                            type="button"
                            onClick={() => onSelectColor(color)}
                            style={{ backgroundColor: color }}
                            className={`w-7.5 h-7.5 rounded-full cursor-pointer transition-all duration-200 select-none border border-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B88E2F] ${
                                isSelected
                                    ? "ring-2 ring-offset-2 ring-[#B88E2F] scale-110"
                                    : "hover:scale-105"
                            } ${isAvailable ? "" : "opacity-40"}`}
                            aria-label={
                                isAvailable
                                    ? `Select color ${color}`
                                    : `Color ${color}, not available in the selected size`
                            }
                            aria-pressed={isSelected}
                        />
                    );
                })}
            </div>
        </div>
    );
}
