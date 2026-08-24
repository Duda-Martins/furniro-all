import { BannerContainer } from "../components/BannerContainer";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";
import LoginForm from "../components/LoginForm";

export function Login() {
    return (
        <>
            <BannerContainer
                title="Login"
                crumbs={[{ label: "Home", to: "/" }, { label: "Login" }]}
            />
            <Container>
                <LoginForm />
            </Container>
            <FeaturesSection />
        </>
    );
}
