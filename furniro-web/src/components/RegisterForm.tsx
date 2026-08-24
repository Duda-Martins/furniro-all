import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthService } from "../services/AuthService";
import { Link, useLocation, useNavigate } from "react-router-dom";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password === "" || data.email === "") {
            return;
        }
        const registerPayload = {
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        };

        try {
            await AuthService.register(registerPayload);

            await AuthService.login({
                email: data.email,
                password: data.password,
            });

            const from = location.state?.from;
            const destination = from
                ? `${from.pathname}${from.search}${from.hash}`
                : "/";

            navigate(destination, { replace: true });
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Registration failed",
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
                        htmlFor="name"
                        className="text-sm font-medium text-[#3a3a3a]"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your name"
                        {...register("name", {
                            required: "Name is required",
                        })}
                        aria-invalid={!!errors.name}
                        className="w-full border border-[#9f9f9f] px-4 py-3 text-sm text-[#3a3a3a] outline-none transition-colors placeholder:text-[#9f9f9f] focus:border-[#b88e2f]"
                    />
                    {errors.name && (
                        <span className="text-xs text-red-500">
                            {errors.name.message}
                        </span>
                    )}
                </div>

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
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                        })}
                        aria-invalid={!!errors.password}
                        className="w-full border border-[#9f9f9f] px-4 py-3 text-sm text-[#3a3a3a] outline-none transition-colors placeholder:text-[#9f9f9f] focus:border-[#b88e2f]"
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-[#3a3a3a]"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Enter your confirmPassword"
                        {...register("confirmPassword", {
                            required: "Password confirmation is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                        aria-invalid={!!errors.confirmPassword}
                        className="w-full border border-[#9f9f9f] px-4 py-3 text-sm text-[#3a3a3a] outline-none transition-colors placeholder:text-[#9f9f9f] focus:border-[#b88e2f]"
                    />
                    {errors.confirmPassword && (
                        <span className="text-xs text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-2 w-full bg-[#b88e2f] px-6 py-3 text-base font-bold text-white transition-colors hover:bg-[#a97c1a]"
                >
                    Register
                </button>
            </form>
            <p className="mx-auto w-full max-w-lg pb-16 text-center font-poppins text-sm text-[#898989] sm:pb-20">
                Do you have an account?{" "}
                <Link
                    to="/login"
                    className="font-medium text-[#B88E2F] underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                    Sign in!
                </Link>
            </p>
        </>
    );
}
