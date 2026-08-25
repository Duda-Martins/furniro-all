import { useEffect, useState } from "react";
import type {
    UseFormRegister,
    UseFormSetError,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";

import { CheckoutField } from "./CheckoutField";
import type { CheckoutFormData } from "../../schemas/checkout.schema";
import { getAddressByCep } from "../../services/CepService";

interface AddressFieldsProps {
    register: UseFormRegister<CheckoutFormData>;
    setValue: UseFormSetValue<CheckoutFormData>;
    setError: UseFormSetError<CheckoutFormData>;
    watch: UseFormWatch<CheckoutFormData>;
    errors: Partial<Record<keyof CheckoutFormData, { message?: string }>>;
}

export function AddressFields({
    register,
    setValue,
    setError,
    watch,
    errors,
}: AddressFieldsProps) {
    const [isLoadingCep, setIsLoadingCep] = useState(false);

    const zipCode = watch("zipCode");

    useEffect(() => {
        const cep = zipCode.replace(/\D/g, "");

        if (cep.length !== 8) {
            return;
        }

        async function fetchAddress() {
            try {
                setIsLoadingCep(true);

                const address = await getAddressByCep(cep);

                setValue("countryRegion", "Brasil", {
                    shouldValidate: true,
                });

                setValue("streetAddress", address.logradouro, {
                    shouldValidate: true,
                });

                setValue("townCity", address.localidade, {
                    shouldValidate: true,
                });

                setValue("province", address.uf, {
                    shouldValidate: true,
                });
            } catch (error) {
                setError("zipCode", {
                    type: "manual",
                    message:
                        error instanceof Error
                            ? error.message
                            : "Unable to find this ZIP Code.",
                });
            } finally {
                setIsLoadingCep(false);
            }
        }

        fetchAddress();
    }, [zipCode, setValue, setError]);

    return (
        <div className="flex flex-col gap-5">
            <CheckoutField label="ZIP Code" error={errors.zipCode?.message}>
                <div className="relative">
                    <input
                        {...register("zipCode")}
                        type="text"
                        inputMode="numeric"
                        maxLength={8}
                        autoComplete="postal-code"
                        className="input"
                        onChange={(event) => {
                            const value = event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 8);

                            setValue("zipCode", value, {
                                shouldValidate: true,
                                shouldDirty: true,
                            });
                        }}
                    />

                    {isLoadingCep && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                            Searching...
                        </span>
                    )}
                </div>
            </CheckoutField>

            <CheckoutField
                label="Country / Region"
                error={errors.countryRegion?.message}
            >
                <input {...register("countryRegion")} className="input" />
            </CheckoutField>

            <CheckoutField
                label="Street Address"
                error={errors.streetAddress?.message}
            >
                <input {...register("streetAddress")} className="input" />
            </CheckoutField>

            <CheckoutField label="Town / City" error={errors.townCity?.message}>
                <input {...register("townCity")} className="input" />
            </CheckoutField>

            <CheckoutField label="Province" error={errors.province?.message}>
                <input {...register("province")} className="input" />
            </CheckoutField>

            <CheckoutField
                label="Add-on Address"
                optional
                error={errors.addOnAddress?.message}
            >
                <input {...register("addOnAddress")} className="input" />
            </CheckoutField>
        </div>
    );
}
