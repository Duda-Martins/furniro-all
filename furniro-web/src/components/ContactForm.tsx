import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { contactSchema, type ContactFormData } from "../schemas/contact.schema";
import { CheckoutField } from "./checkout/CheckoutField";

export function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async () => {
        toast.success("Message sent successfully!");
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:col-span-2"
        >
            <div className="space-y-5">
                <CheckoutField label="Your name" error={errors.name?.message}>
                    <input
                        {...register("name")}
                        type="text"
                        autoComplete="name"
                        placeholder="Abc"
                        className="input w-full"
                    />
                </CheckoutField>

                <CheckoutField
                    label="Email address"
                    error={errors.email?.message}
                >
                    <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        placeholder="Abc@def.com"
                        className="input w-full"
                    />
                </CheckoutField>

                <CheckoutField
                    label="Subject"
                    optional
                    error={errors.subject?.message}
                >
                    <input
                        {...register("subject")}
                        type="text"
                        placeholder="This is an optional"
                        className="input w-full"
                    />
                </CheckoutField>

                <CheckoutField label="Message" error={errors.message?.message}>
                    <textarea
                        {...register("message")}
                        placeholder="Hi! I'd like to ask about"
                        rows={5}
                        className="input w-full resize-none"
                    />
                </CheckoutField>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full rounded-[5px] bg-[#b88e2f] px-8 py-4 text-base font-poppins text-white sm:w-auto sm:px-20 lg:px-25"
            >
                {isSubmitting ? "Sending..." : "Submit"}
            </button>
        </form>
    );
}
