import { BannerContainer } from "../components/BannerContainer";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";
import { CheckoutForm } from "../components/checkout/CheckoutForm";

export function Checkout() {
    return (
        <>
            <BannerContainer
                title="Checkout"
                crumbs={[
                    { label: "Home", to: "/" },
                    { label: "Cart", to: "/cart" },
                    { label: "Checkout" },
                ]}
            />
            <Container>
                <div className="py-20">
                    <CheckoutForm />
                </div>
            </Container>
            <FeaturesSection />
        </>
    );
}
