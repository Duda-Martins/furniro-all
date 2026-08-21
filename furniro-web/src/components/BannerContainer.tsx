import { Link } from "react-router-dom";

export type Crumb = {
    label: string;
    to?: string;
};

type BannerContainerProps = {
    title: string;
    crumbs: Crumb[];
    image?: string;
    className?: string;
};

export function BannerContainer({
    title,
    crumbs,
    image = "/img/banner.jpg",
    className = "",
}: BannerContainerProps) {
    return (
        <section
            className={`relative flex h-40 w-full items-center justify-center overflow-hidden bg-[#F9F1E7] sm:h-60 md:h-[clamp(320px,22.78vw,420px)] ${className}`}
        >
            {image && (
                <img
                    src={image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-[35%_center] blur-[3px]"
                />
            )}

            <div className="relative flex flex-col items-center gap-2 px-6 text-center">
                <h1 className="font-poppins text-4xl font-medium text-black md:text-5xl">
                    {title}
                </h1>

                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-row flex-wrap items-center justify-center gap-2 font-poppins text-base text-black">
                        {crumbs.map((crumb, index) => {
                            const isLast = index === crumbs.length - 1;

                            return (
                                <li
                                    key={crumb.label}
                                    className="flex flex-row items-center gap-2"
                                >
                                    {crumb.to && !isLast ? (
                                        <Link
                                            to={crumb.to}
                                            className="font-medium hover:underline"
                                        >
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className="font-light"
                                            aria-current={isLast ? "page" : undefined}
                                        >
                                            {crumb.label}
                                        </span>
                                    )}

                                    {!isLast && (
                                        <svg
                                            aria-hidden="true"
                                            width="8"
                                            height="14"
                                            viewBox="0 0 8 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </section>
    );
}
