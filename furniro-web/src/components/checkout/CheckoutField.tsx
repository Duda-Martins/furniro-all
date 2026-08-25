interface CheckoutFieldProps {
    label: string;
    optional?: boolean;
    error?: string;
    children: React.ReactNode;
}

export function CheckoutField({
    label,
    optional = false,
    error,
    children,
}: CheckoutFieldProps) {
    return (
        <div className="flex flex-col gap-5">
            <label className="font-poppins text-base font-medium text-black">
                {label} {optional && "(Optional)"}
            </label>

            {children}

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
}
