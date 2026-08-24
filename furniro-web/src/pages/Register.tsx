import { BannerContainer } from "../components/BannerContainer";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";
import RegisterForm from "../components/RegisterForm";

export function Register() {
    return (
        <>
            <BannerContainer
                title="Register"
                crumbs={[{ label: "Home", to: "/" }, { label: "Register" }]}
            />
            <Container>
                <RegisterForm />
            </Container>
            <FeaturesSection />
        </>
    );
}
