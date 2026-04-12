import React, { useState } from "react";
import {Alert,Button,CircularProgress,Link,Stack,TextField,Typography,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../validation/LoginSchema";
import axiosInstance from "../../../api/axiosInstance";
import useAuthStore from "../../../store/useAuthStore";
import AuthShell from "../../../components/auth/AuthShell";
import AuthProgressPanel from "../../../components/auth/AuthProgressPanel";
import { getAuthButtonSx, getAuthFieldSx } from "../../../components/auth/authFieldStyles";

export default function Login() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [serverError, setServerError] = useState([]);
    const [activeField, setActiveField] = useState("");
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || "/";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
    });

    const values = watch();
    const progressItems = [
        { label: t("Email"), filled: Boolean(values.email) },
        { label: t("Password"), filled: Boolean(values.password) },
    ];
    const completion =
        (progressItems.filter((item) => item.filled).length / progressItems.length) * 100;

    const loginForm = async (values) => {
        try {
            setServerError([]);
            const response = await axiosInstance.post("/auth/Account/Login", values);
            if (response.status === 200) {
                setToken(response.data.accessToken);
                navigate(redirectTo, { replace: true });
            }
        } catch (error) {
            setServerError(error.response?.data?.errors || [t("InvalidCredentials")]);
        }
    };

    return (
        <AuthShell
            title={t("WelcomeBack")}
            subtitle={t("LoginSubtitle")}
            asideTitle={t("LoginAsideTitle")}
            asideText={t("LoginAsideText")}
        >
            <Stack component="form" spacing={2.25} onSubmit={handleSubmit(loginForm)}>
                <AuthProgressPanel
                    progress={completion}
                    summary={t("LoginSubtitle")}
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

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ pt: 0.5 }}
                >
                    <Link component={RouterLink} to="/forgot-password" underline="hover">
                        {t("ForgotPassword")}
                    </Link>
                    <Link component={RouterLink} to="/register" underline="hover">
                        {t("CreateAccount")}
                    </Link>
                </Stack>

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    disabled={isSubmitting}
                    sx={getAuthButtonSx(theme)}
                >
                    {isSubmitting ? <CircularProgress size={22} color="inherit" /> : t("Login")}
                </Button>

                <Stack
                    spacing={0.5}
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
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{t("QuickNote")}</Typography>
                    <Typography sx={{ color: "text.secondary", fontSize: "0.92rem", lineHeight: 1.7 }}>
                        {t("LoginHint")}
                    </Typography>
                </Stack>

                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                    {t("NoAccount")}{" "}
                    <Link component={RouterLink} to="/register" underline="hover">
                        {t("RegisterHere")}
                    </Link>
                </Typography>
            </Stack>
        </AuthShell>
    );
}
