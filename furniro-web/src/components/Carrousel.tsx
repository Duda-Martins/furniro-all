import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { slides } from "../data/slides";
import { CarrouselSlide } from "./CarrouselSlide";

export function Carrousel() {
    const splideOptions = {
        type: "loop" as const,
        perPage: 1,
        fixedWidth: 404,
        focus: 0,
        arrows: true,
        pagination: true,
        classes: {
            page: "splide__pagination__page !w-3 !h-3 !bg-[#D8D8D8] !opacity-100 transition-all duration-300 rounded-full [&.is-active]:bg-[#b88e2f] [&.is-active]:outline [&.is-active]:outline-1 [&.is-active]:outline-[#b88e2f] [&.is-active]:outline-offset-7",
        },
    };

    return (
        <div className="w-full md:w-4/6 px-2 md:px-0">
            <Splide id="carrousel" aria-label="Inspiring images" options={splideOptions}>
                {slides.map((slide, index) => (
                    <CarrouselSlide key={`${slide.src}-${index}`} slide={slide} />
                ))}
            </Splide>
        </div>
    );
}
