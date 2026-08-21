import { Link } from "react-router-dom";
import { SplideSlide } from "@splidejs/react-splide";
import type { SlideItem } from "../models/slide";
import { scrollToTop } from "../utils/scrollToTop";

type CarouselSlideProps = {
    slide: SlideItem;
};

export function CarrouselSlide({ slide }: CarouselSlideProps) {
    const categoryPath = `/shop/${slide.category}`;

    return (
        <SplideSlide className="group">
            <div className="relative">
                <img
                    src={slide.src}
                    alt={slide.alt}
                    className="object-cover object-center transition-all duration-500"
                />
                <div className="absolute left-6 bottom-5 opacity-0 translate-y-4 pointer-events-none transition-all duration-300 group-[.is-active]:opacity-100 group-[.is-active]:translate-y-0 group-[.is-active]:pointer-events-auto flex items-end">
                    <div className="bg-white/72 backdrop-blur-[3px] p-6 min-w-50">
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            {slide.number} <span className="h-px w-8 bg-gray-400"></span>{" "}
                            {slide.category}
                        </p>
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                            {slide.title}
                        </h3>
                    </div>

                    <Link
                        to={categoryPath}
                        onClick={() => scrollToTop()}
                        aria-label={`View ${slide.category} in Shop`}
                        className="bg-[#b88e2f] text-white p-4 hover:bg-[#967324] transition-colors flex items-center justify-center"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 12H3M15 18L21 12L15 6"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </SplideSlide>
    );
}
