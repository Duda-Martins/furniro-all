import { Container } from "./Container";
import { MainBtn } from "./MainBtn";

export function Hero() {
    return (
        <section className="relative h-[calc(100svh-6rem)] overflow-hidden bg-[url('/img/bg-hero.jpg')] bg-cover bg-bottom bg-no-repeat sm:bg-center">
            <Container className="flex h-full items-center justify-center sm:justify-end">
                <div className="flex min-h-70 w-[90%] max-w-130 flex-col justify-between rounded-none bg-[#FFF3E3] px-4 py-6 sm:h-auto sm:min-h-80 sm:w-1/2 sm:max-w-130 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
                    <div className="space-y-2 sm:space-y-3">
                        <p className="font-poppins text-sm font-semibold tracking-[0.2em] sm:text-base">
                            New Arrival
                        </p>
                        <h1 className="font-poppins text-3xl font-bold leading-tight text-[#b88e2f] sm:text-4xl lg:text-5xl">
                            Discover Our New Collection
                        </h1>
                    </div>
                    <p className="mt-4 text-sm font-medium leading-relaxed sm:mt-5 sm:text-base lg:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                        tellus, luctus nec ullamcorper mattis.
                    </p>
                    <div className="mt-5 sm:mt-6">
                        <MainBtn />
                    </div>
                </div>
            </Container>
        </section>
    );
}
