import * as yup from "yup";

export function createChangePasswordSchema(t) {
    return yup.object({
        currentPassword: yup.string().required(t("ValidationCurrentPasswordRequired")),
        newPassword: yup
            .string()
            .required(t("ValidationNewPasswordRequired"))
            .min(8, t("ValidationPasswordMin")),
        confirmNewPassword: yup
            .string()
            .required(t("ValidationConfirmPasswordRequired"))
            .oneOf([yup.ref("newPassword")], t("ValidationPasswordsMustMatch")),
    });
}
