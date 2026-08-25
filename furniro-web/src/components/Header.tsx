import { Container } from "./Container";
import { Logo } from "./Logo";
import { Nav } from "./Nav";
import { UserAndCartIcon } from "./UserAndCartIcon";

export function Header() {
    return (
        <header className="sticky top-0 z-50 h-24 bg-white">
            <Container className="flex h-full flex-row flex-wrap items-center justify-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
                <Logo />

                <div className="flex flex-row justify-center gap-2 md:contents">
                    <Nav className="order-4 md:order-1 md:justify-self-center" />
                    <UserAndCartIcon className="order-1 md:order-4 md:justify-self-end" />
                </div>
            </Container>
        </header>
    );
}
