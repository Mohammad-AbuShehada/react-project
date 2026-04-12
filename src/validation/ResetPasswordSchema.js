import * as yup from "yup";

export const resetPasswordSchema = yup.object({
    email: yup.string().required("Email is required").email("Email must be valid"),
    code: yup.string().required("Verification code is required"),
    newPassword: yup
        .string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
});
