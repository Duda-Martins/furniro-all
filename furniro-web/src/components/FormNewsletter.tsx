import { useState } from "react";
import { toast } from "react-toastify";

export function FormNewsletter() {
    const [email, setEmail] = useState("");
    const [touched, setTouched] = useState(false);

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const erro =
        touched && email && !validEmail
            ? "Invalid e-mail."
            : "";

    function handleSubmitNewsletter(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setTouched(true);

        const cleanEmail = email.trim();

        if (!cleanEmail) {
            toast.error("Please, enter your email.");
            return;
        }

        if (!validEmail) {
            toast.error("Please, enter a valid email address.");
            return;
        }

        toast.success("Thank you for subscribing to our newsletter.");

        setEmail("");
        setTouched(false);
    }

    return (
        <form onSubmit={handleSubmitNewsletter} className="flex flex-col">
            <div className="flex items-end gap-2">
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    aria-invalid={!!erro}
                    aria-describedby="email-error"
                    className="font-poppins text-sm text-[#9F9F9F] min-w-0 flex-1 pb-1 border-b border-b-black text-start"
                />

                <button
                    type="submit"
                    disabled={!email || !validEmail}
                    className="font-poppins text-sm font-medium shrink-0 pb-1 border-b border-b-black cursor-pointer hover:opacity-70 disabled:opacity-50 disabled:hover:opacity-50"
                >
                    SUBSCRIBE
                </button>
            </div>

            <p id="email-error" className="text-xs text-red-500 min-h-5 mt-1">
                {erro}
            </p>
        </form>
    );
}