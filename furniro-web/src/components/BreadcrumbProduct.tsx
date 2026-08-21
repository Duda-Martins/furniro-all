import { Link } from "react-router-dom";
import { Container } from "./Container";

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProductProps {
    productName: string;
    breadcrumbs?: BreadcrumbItem[];
}

export function BreadcrumbProduct({
    productName,
    breadcrumbs = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
    ],
}: BreadcrumbProductProps) {
    return (
        <section className="flex w-full min-h-24 items-center bg-[#f9f1e7] py-6 select-none">
            <Container>
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-row flex-wrap items-center gap-4 sm:gap-6">
                        {breadcrumbs.map((item) => (
                            <li
                                key={item.label}
                                className="inline-flex items-center gap-4 sm:gap-6"
                            >
                                {item.path ? (
                                    <Link
                                        to={item.path}
                                        className="text-[#9f9f9f] text-base font-normal font-poppins hover:text-black transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#9f9f9f] text-base font-normal font-poppins">
                                        {item.label}
                                    </span>
                                )}
                                <svg
                                    aria-hidden="true"
                                    className="w-3.5 h-3.5 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </li>
                        ))}

                        <li className="inline-flex items-center gap-4 sm:gap-6">
                            <span
                                aria-hidden="true"
                                className="h-9 w-0.5 bg-[#9f9f9f]"
                            />
                            <span
                                aria-current="page"
                                className="text-black text-base font-normal font-poppins"
                            >
                                {productName}
                            </span>
                        </li>
                    </ol>
                </nav>
            </Container>
        </section>
    );
}
