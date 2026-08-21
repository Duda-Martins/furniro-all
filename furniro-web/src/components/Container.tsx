import type { ReactNode } from "react";

type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`mx-auto w-full max-w-content px-6 lg:px-12 xl:px-25 ${className}`}>
            {children}
        </div>
    );
}
