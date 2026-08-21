import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/scrollToTop";

export function MainBtn() {
    return (
        <Link
            to="/shop"
            onClick={scrollToTop}
            className="inline-block bg-[#b88e2f] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#a97c1a] sm:px-8 sm:py-4 lg:px-10 lg:py-4"
        >
            Buy Now
        </Link>
    );
}
