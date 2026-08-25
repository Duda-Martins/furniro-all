import { z } from "zod";

export const checkoutSchema = z.object({
    firstName: z.string().trim().min(1, "First Name is required."),

    lastName: z.string().trim().min(1, "Last Name is required."),

    companyName: z.string().trim().optional(),

    zipCode: z.string().regex(/^\d{8}$/, "ZIP Code must contain 8 digits."),

    countryRegion: z.string().trim().min(1, "Country/Region is required."),

    streetAddress: z.string().trim().min(1, "Street Address is required."),

    townCity: z.string().trim().min(1, "Town/City is required."),

    province: z.string().trim().min(1, "Province is required."),

    addOnAddress: z.string().trim().optional(),

    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Enter a valid email address."),

    additionalInformation: z.string().trim().optional(),

    paymentMethod: z.string().min(1, "Select a payment method."),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
