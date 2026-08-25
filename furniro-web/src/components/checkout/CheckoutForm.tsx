import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import {
    checkoutSchema,
    type CheckoutFormData,
} from "../../schemas/checkout.schema";

import { useCartStore } from "../../store/cartStore";

import { CheckoutField } from "./CheckoutField";
import { AddressFields } from "./AddressFields";
import { PlaceOrderDetails } from "./PlaceOrderDetails";

export function CheckoutForm() {
    const clear = useCartStore((state) => state.clear);

    const methods = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),

        defaultValues: {
            firstName: "",
            lastName: "",
            companyName: "",
            zipCode: "",
            countryRegion: "",
            streetAddress: "",
            townCity: "",
            province: "",
            addOnAddress: "",
            email: "",
            additionalInformation: "",
            paymentMethod: "",
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async () => {
        toast.success("Order placed successfully!");

        clear();
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-32 lg:grid-cols-2"
            >
                <section>
                    <h2 className="mb-6 font-poppins text-4xl font-semibold">
                        Billing details
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <CheckoutField
                            label="First Name"
                            error={errors.firstName?.message}
                        >
                            <input
                                {...register("firstName")}
                                type="text"
                                autoComplete="given-name"
                                className="input"
                            />
                        </CheckoutField>

                        <CheckoutField
                            label="Last Name"
                            error={errors.lastName?.message}
                        >
                            <input
                                {...register("lastName")}
                                type="text"
                                autoComplete="family-name"
                                className="input"
                            />
                        </CheckoutField>

                        <div className="sm:col-span-2">
                            <CheckoutField
                                label="Company Name"
                                optional
                                error={errors.companyName?.message}
                            >
                                <input
                                    {...register("companyName")}
                                    type="text"
                                    className="input"
                                />
                            </CheckoutField>
                        </div>

                        <div className="sm:col-span-2">
                            <AddressFields
                                register={register}
                                setValue={setValue}
                                setError={setError}
                                watch={watch}
                                errors={errors}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <CheckoutField
                                label="Email Address"
                                error={errors.email?.message}
                            >
                                <input
                                    {...register("email")}
                                    type="email"
                                    autoComplete="email"
                                    className="input"
                                />
                            </CheckoutField>
                        </div>

                        <div className="sm:col-span-2">
                            <CheckoutField label="">
                                <input
                                    className="input"
                                    {...register("additionalInformation")}
                                    type="text"
                                    placeholder="Additional Information"
                                />
                            </CheckoutField>
                        </div>
                    </div>
                </section>

                <PlaceOrderDetails isSubmitting={isSubmitting} />
            </form>
        </FormProvider>
    );
}
