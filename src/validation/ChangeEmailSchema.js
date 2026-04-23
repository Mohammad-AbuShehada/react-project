import * as yup from "yup";

export function createChangeEmailSchema(t) {
    return yup.object({
        newEmail: yup
            .string()
            .trim()
            .email(t("ValidationEmailInvalid"))
            .required(t("ValidationNewEmailRequired")),
    });
}
