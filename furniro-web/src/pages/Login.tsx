import { BannerContainer } from "../components/BannerContainer";
import { Container } from "../components/Container";
import { FeaturesSection } from "../components/FeaturesSection";
import LoginForm from "../components/LoginForm";
import { useAuthStore } from "../store/authStore";

export function Login() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    return (
        <>
            <BannerContainer
                title="Login"
                crumbs={[{ label: "Home", to: "/" }, { label: "Login" }]}
            />

            <Container>
                {isAuthenticated ? (
                    <div className="flex min-h-75 flex-col items-center justify-center text-center">
                        <h2 className="font-poppins text-2xl font-semibold">
                            You are already logged in!
                        </h2>

                        <p className="mt-2 font-poppins text-gray-600">
                            You already have an active session.
                        </p>

                        <button
                            type="button"
                            onClick={logout}
                            className="mt-6 bg-[#B88E2F] px-12 py-3 font-poppins text-sm font-medium text-white transition-colors hover:bg-[#a27d27]"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <LoginForm />
                )}
            </Container>

            <FeaturesSection />
        </>
    );
}
