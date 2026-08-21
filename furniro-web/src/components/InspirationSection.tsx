import { Link } from "react-router-dom";
import { Carrousel } from "./Carrousel";
import { Container } from "./Container";
import { scrollToTop } from "../utils/scrollToTop";

export function InspirationSection() {
    return (
        <section className="py-10 my-10 bg-[#FCF8F3]">
            <Container className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                <div className="flex flex-col gap-6 items-start">
                    <div>
                        <h2 className="font-poppins font-bold text-4xl/[120%] text-[#3A3A3A] mb-3">
                            50+ Beautiful rooms inspiration
                        </h2>
                        <p className="font-poppins font-medium text-base/[150%] text-[#616161]">
                            Our designer already made a lot of beautiful prototipe of
                            rooms that inspire you
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        onClick={scrollToTop}
                        className="block p-6 font-poppins text-white bg-[#B88E2F] hover:bg-[#A97C1A] transition-colors"
                    >
                        Explore More
                    </Link>
                </div>
                <Carrousel />
            </Container>
        </section>
    );
}
