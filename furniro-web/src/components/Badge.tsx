type ProductBadgeProps = {
    discount?: number;
    isNew?: boolean;
};

export function Badge({ discount, isNew }: ProductBadgeProps) {
    const color = discount ? "bg-[#E97171]" : isNew ? "bg-[#2EC1AC]" : "";
    return (
        <div
            className={`absolute top-2 right-2 flex items-center justify-center  w-12 h-12 rounded-full ${color}`}
        >
            <p className="font-poppins text-base font-medium text-white">
                {discount ? `-${discount}%` : isNew ? "New" : ""}
            </p>
        </div>
    );
}
