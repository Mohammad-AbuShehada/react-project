import * as yup from "yup";

export function createCheckoutSchema(t) {
    return yup.object({
        firstName: yup.string().trim().required(t("ValidationFirstNameRequired")),
        lastName: yup.string().trim().required(t("ValidationLastNameRequired")),
        company: yup.string().trim().nullable(),
        countryRegion: yup.string().trim().required(t("ValidationCountryRequired")),
        streetAddress: yup.string().trim().required(t("ValidationStreetRequired")),
        townCity: yup.string().trim().required(t("ValidationCityRequired")),
        state: yup.string().trim().required(t("ValidationStateRequired")),
        zipCode: yup.string().trim().required(t("ValidationZipRequired")),
        phone: yup.string().trim().required(t("ValidationPhoneRequired")),
        email: yup
            .string()
            .trim()
            .email(t("ValidationEmailInvalid"))
            .required(t("ValidationEmailRequired")),
        billingNotes: yup.string().trim().nullable(),
        paymentMethod: yup.string().oneOf(["Visa", "Cash"]).required(),
        cardNumber: yup.string().when("paymentMethod", {
            is: "Visa",
            then: (schema) =>
                schema
                    .trim()
                    .required(t("ValidationCardNumberRequired"))
                    .matches(/^\d{13,19}$/, t("ValidationCardNumberInvalid")),
            otherwise: (schema) => schema.nullable().transform(() => ""),
        }),
        nameOnCard: yup.string().when("paymentMethod", {
            is: "Visa",
            then: (schema) => schema.trim().required(t("ValidationCardNameRequired")),
            otherwise: (schema) => schema.nullable().transform(() => ""),
        }),
        expirationDate: yup.string().when("paymentMethod", {
            is: "Visa",
            then: (schema) =>
                schema
                    .trim()
                    .required(t("ValidationExpirationRequired"))
                    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, t("ValidationExpirationInvalid")),
            otherwise: (schema) => schema.nullable().transform(() => ""),
        }),
        securityCode: yup.string().when("paymentMethod", {
            is: "Visa",
            then: (schema) =>
                schema
                    .trim()
                    .required(t("ValidationSecurityCodeRequired"))
                    .matches(/^\d{3,4}$/, t("ValidationSecurityCodeInvalid")),
            otherwise: (schema) => schema.nullable().transform(() => ""),
        }),
    });
}
