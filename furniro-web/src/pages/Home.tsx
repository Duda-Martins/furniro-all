import { Hero } from "../components/Hero";
import { BrowseSection } from "../components/BrowseSection";
import { ProductsSection } from "../components/ProductsSection";
import { InspirationSection } from "../components/InspirationSection";
import { FuniroFurnitureSection } from "../components/FuniroFurnitureSection";

export function Home() {
    return (
        <>
            <Hero />
            <BrowseSection />
            <ProductsSection />
            <InspirationSection />
            <FuniroFurnitureSection />
        </>
    );
}
