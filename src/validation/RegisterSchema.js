import * as yup from "yup"

export const registerSchema = yup.object({
    userName: yup.string().required("User Name is required").min(3, "User Name must be at least 3 characters")
    .matches(/^[a-zA-Z0-9_-]+$/, "User Name must contain only letters, numbers, underscores, or hyphens"),
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().required("Email is required").email("Email must be a valid email"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
    phoneNumber: yup.string().required("Phone Number is required"),
});