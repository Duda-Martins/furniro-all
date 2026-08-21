import { Link } from "react-router-dom";
import { Container } from "./Container";

const categories = [
    {
        name: "Dining",
        image: "/img/dining.png",
        objectPosition: "object-left",
        alt: "Small round dining setup with low table draped in a textured white cloth, decorative tray with natural elements, and neutral colors in a bright room; calm and cozy atmosphere",
    },
    {
        name: "Living",
        image: "/img/living.png",
        objectPosition: "",
        alt: "Cozy living room scene with a neutral sofa, textured cushions, and soft natural light creating a calm and inviting atmosphere",
    },
    {
        name: "Bedroom",
        image: "/img/bedroom.png",
        objectPosition: "object-left",
        alt: "Serene bedroom setup with a neatly made bed, layered blankets, and warm tones conveying comfort and relaxation",
    },
];

export function BrowseSection() {
    return (
        <section className="bg-white pt-10">
            <Container>
                <div className="font-poppins text-center mb-10">
                    <h2 className="font-bold text-3xl">Browse The Range</h2>
                    <p className="text-[#666666] text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            to={`/shop/${category.name}`}
                            className="block transition-transform hover:-translate-y-1 hover:shadow-[0px_4px_14px_0px_rgba(0,0,0,0.15)] rounded-lg"
                        >
                            <img
                                src={category.image}
                                alt={category.alt}
                                className={`aspect-4/5 w-full rounded-lg object-cover ${category.objectPosition}`}
                            />
                            <p className="font-semibold text-[#666666] text-2xl text-center mt-8 mb-10">
                                {category.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
