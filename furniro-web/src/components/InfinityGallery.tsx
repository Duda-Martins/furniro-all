import { PrincipalGrid } from "./PrincipalGrid";

export function InfinityGallery() {
    return (
        <section className="overflow-hidden">
            <div className="flex w-max animate-gallery">
                <PrincipalGrid />
                <PrincipalGrid />
            </div>
        </section>
    );
}
