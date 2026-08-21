import { Container } from "./Container";

const features = [
    {
        icon: "/icons/trophy 1.svg",
        title: "High Quality",
        description: "crafted from top materials",
        alt: "High Quality trophy icon",
    },
    {
        icon: "/icons/guarantee.svg",
        title: "Warranty Protection",
        description: "Over 2 years",
        alt: "Warranty Protection guarantee icon",
    },
    {
        icon: "/icons/shipping.svg",
        title: "Free Shipping",
        description: "Order over 150 $",
        alt: "Free Shipping box icon",
    },
    {
        icon: "/icons/customer-support.svg",
        title: "24 / 7 Support",
        description: "Dedicated support",
        alt: "24/7 Support customer service icon",
    },
];

export function FeaturesSection() {
    return (
        <section className="w-full bg-[#FAF3EA] py-12 lg:py-20 xl:py-[100px]">
            <Container>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="flex items-center gap-2.5 sm:gap-3.5 lg:gap-3 xl:gap-4"
                        >
                            <img
                                src={feature.icon}
                                alt={feature.alt}
                                className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14 xl:h-[60px] xl:w-[60px]"
                            />
                            <div className="flex flex-col gap-0.5">
                                <h3 className="font-poppins font-semibold text-[#242424] text-lg sm:text-xl lg:text-[20px] lg:leading-7 xl:text-[25px] xl:leading-[37.5px]">
                                    {feature.title}
                                </h3>
                                <p className="font-poppins font-medium text-[#898989] text-sm sm:text-base lg:text-[16px] lg:leading-6 xl:text-[20px] xl:leading-[30px]">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

