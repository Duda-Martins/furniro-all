import { InfinityGallery } from "./InfinityGallery";

export function FuniroFurnitureSection() {
    return (
        <section className="mb-15">
            <div>
                <p className="text-[#616161]  text-xl/[150%] font-semibold text-center mb-2">
                    Share your setup with
                </p>
                <h2 className="text-[#3A3A3A] text-4xl/[120%] font-bold text-center font-poppins">
                    #FuniroFurniture
                </h2>
            </div>
            <InfinityGallery />
        </section>
    );
}
