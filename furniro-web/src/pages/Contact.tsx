import { BannerContainer } from "../components/BannerContainer";
import { ContactForm } from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";

export function Contact() {
    return (
        <>
            <BannerContainer
                title="Contact"
                crumbs={[
                    { label: "Home", to: "/" },
                    { label: "Cart", to: "/cart" },
                    { label: "Contact" },
                ]}
            />

            <Container>
                <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-45 lg:py-30">
                    <h1 className="mb-5 text-center text-2xl font-bold sm:text-3xl">
                        Get In Touch With Us
                    </h1>

                    <p className="mx-auto max-w-3xl text-center text-base text-gray-600 sm:text-lg">
                        For More Information About Our Product & Services.
                        Please Feel Free To Drop Us An Email. Our Staff Always
                        Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-3 lg:gap-20 lg:px-15 lg:pb-20">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </Container>

            <FeaturesSection />
        </>
    );
}
