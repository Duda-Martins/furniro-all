import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthService } from "../services/AuthService";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password === "" || data.email === "") {
            return;
        }
        const loginPayload = {
            email: data.email,
            password: data.password,
        };
        try {
            await AuthService.login(loginPayload);
            const from = location.state?.from;
            const destination = from
                ? `${from.pathname}${from.search}${from.hash}`
                : "/";

            navigate(destination, { replace: true });
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Invalid credentials",
            );
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto flex w-full max-w-lg flex-col gap-5 py-16 font-poppins sm:py-20"
            >
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-[#3a3a3a]"
                    >
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        aria-invalid={!!errors.email}
                        className="w-full border border-[#9f9f9f] px-4 py-3 text-sm text-[#3a3a3a] outline-none transition-colors placeholder:text-[#9f9f9f] focus:border-[#b88e2f]"
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-[#3a3a3a]"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                        aria-invalid={!!errors.password}
                        className="w-full border border-[#9f9f9f] px-4 py-3 text-sm text-[#3a3a3a] outline-none transition-colors placeholder:text-[#9f9f9f] focus:border-[#b88e2f]"
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            This field is required
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full bg-[#b88e2f] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#a97c1a]"
                >
                    Login
                </button>
            </form>
            <p className="mx-auto w-full max-w-lg pb-16 text-center font-poppins text-sm text-[#898989] sm:pb-20">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="font-medium text-[#B88E2F] underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                    Sign up!
                </Link>
            </p>
        </>
    );
}
