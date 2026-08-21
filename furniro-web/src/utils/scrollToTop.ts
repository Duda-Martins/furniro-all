import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function scrollToTop(behavior: ScrollBehavior | unknown = "smooth") {
    const scrollBehavior: ScrollBehavior =
        typeof behavior === "string" && (behavior === "smooth" || behavior === "instant" || behavior === "auto")
            ? behavior
            : "smooth";

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: scrollBehavior,
    });
}

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}
