import React, { useState } from "react";
import {Alert,Button,CircularProgress,Link,Paper,Stack,TextField,Typography,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { registerSchema } from "../../../validation/RegisterSchema";
import axiosInstance from "../../../api/axiosInstance";
import AuthShell from "../../../components/auth/AuthShell";
import AuthProgressPanel from "../../../components/auth/AuthProgressPanel";
import { getAuthButtonSx, getAuthFieldSx } from "../../../components/auth/authFieldStyles";

export default function Register() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [serverError, setServerError] = useState([]);
    const [activeField, setActiveField] = useState("");
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
    });

    const values = watch();
    const progressItems = [
        { label: t("Name"), filled: Boolean(values.userName) },
        { label: t("FullName"), filled: Boolean(values.fullName) },
        { label: t("Email"), filled: Boolean(values.email) },
        { label: t("Password"), filled: Boolean(values.password) },
        { label: t("Phone"), filled: Boolean(values.phoneNumber) },
    ];
    const completion =
        (progressItems.filter((item) => item.filled).length / progressItems.length) * 100;

    const registerForm = async (values) => {
        try {
            setServerError([]);
            await axiosInstance.post("/auth/Account/Register", values);
            navigate("/login");
        } catch (error) {
            setServerError(error.response?.data?.errors || [t("SomethingWentWrong")]);
        }
    };

    return (
        <AuthShell
            title={t("CreateAccount")}
            subtitle={t("RegisterSubtitle")}
            asideTitle={t("RegisterAsideTitle")}
            asideText={t("RegisterAsideText")}
        >
            <Stack component="form" spacing={2.25} onSubmit={handleSubmit(registerForm)}>
                <AuthProgressPanel
                    progress={completion}
                    summary={t("RegisterSubtitle")}
                    items={progressItems}
                />

                {serverError.length > 0
                    ? serverError.map((errorItem, index) => (
                        <Alert key={`${errorItem}-${index}`} severity="error" variant="outlined">
                            {errorItem}
                        </Alert>
                    ))
                    : null}

                <TextField
                    {...register("userName")}
                    label={t("Name")}
                    fullWidth
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    onFocus={() => setActiveField("userName")}
                    onBlur={() => setActiveField("")}
                    sx={getAuthFieldSx(theme, activeField === "userName", Boolean(values.userName))}
                />

                <TextField
                    {...register("fullName")}
                    label={t("FullName")}
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    onFocus={() => setActiveField("fullName")}
                    onBlur={() => setActiveField("")}
                    sx={getAuthFieldSx(theme, activeField === "fullName", Boolean(values.fullName))}
                />

                <TextField
                    {...register("email")}
                    label={t("Email")}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField("")}
                    sx={getAuthFieldSx(theme, activeField === "email", Boolean(values.email))}
                />

                <TextField
                    {...register("password")}
                    label={t("Password")}
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    onFocus={() => setActiveField("password")}
                    onBlur={() => setActiveField("")}
                    sx={getAuthFieldSx(theme, activeField === "password", Boolean(values.password))}
                />

                <TextField
                    {...register("phoneNumber")}
                    label={t("Phone")}
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    onFocus={() => setActiveField("phoneNumber")}
                    onBlur={() => setActiveField("")}
                    sx={getAuthFieldSx(theme, activeField === "phoneNumber", Boolean(values.phoneNumber))}
                />

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={isSubmitting}
                    sx={getAuthButtonSx(theme)}
                >
                    {isSubmitting ? <CircularProgress size={22} color="inherit" /> : t("Register")}
                </Button>

                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        border: 1,
                        borderColor: "divider",
                        bgcolor: theme.palette.surface[200],
                        borderRadius: 3,
                        transition: "transform 0.22s ease, box-shadow 0.22s ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[2],
                        },
                    }}
                >
                    <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.7 }}>
                        {t("RegisterHint")}
                    </Typography>
                </Paper>

                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                    {t("AlreadyHaveAccount")}{" "}
                    <Link component={RouterLink} to="/login" underline="hover">
                        {t("LoginHere")}
                    </Link>
                </Typography>
            </Stack>
        </AuthShell>
    );
}
