import { useState } from "react";
import { Link } from "react-router-dom";

type NavProps = {
    className?: string;
};

export function Nav({ className }: NavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav
            className={
                className +
                " relative text-base font-poppins font-medium"
            }
        >
            <button
                type="button"
                aria-label="Abrir menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((prev) => !prev)}
                className="ml-auto flex items-center justify-center rounded-md p-1 text-zinc-800 transition-colors hover:bg-zinc-100 md:hidden"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>

            <ul
                id="mobile-navigation"
                className={`${isOpen ? "flex" : "hidden"} absolute left-1/2 top-full w-[90vw] max-w-90 -translate-x-1/2 flex-col gap-3 rounded-2xl bg-white p-5 shadow-lg md:static md:w-auto md:max-w-none md:translate-x-0 md:flex md:flex-row md:flex-nowrap md:gap-6 md:whitespace-nowrap md:rounded-none md:p-0 md:shadow-none lg:gap-10 xl:gap-18.75`}
            >
                <li>
                    <Link to="/" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/shop" onClick={closeMenu}>
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to="/about" onClick={closeMenu}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact" onClick={closeMenu}>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
