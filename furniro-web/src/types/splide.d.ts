declare module "@splidejs/react-splide" {
    import * as React from "react";

    export interface SplideProps extends React.HTMLAttributes<HTMLElement> {
        children?: React.ReactNode;
        options?: Record<string, unknown>;
    }

    export const Splide: React.ComponentType<SplideProps>;
    export const SplideSlide: React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

declare module "@splidejs/react-splide/css";
declare module "@splidejs/react-splide/css/core";
declare module "@splidejs/react-splide/css/skyblue";
declare module "@splidejs/react-splide/css/sea-green";
