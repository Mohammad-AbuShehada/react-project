import React, { useState } from "react";
import {Alert,Button,CircularProgress,Paper,Stack,TextField,Typography,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthShell from "../../../components/auth/AuthShell";
import useSendCode from "../../../hooks/useSendCode";
import useResetPassword from "../../../hooks/useResetPassword";
import { forgotPasswordSchema } from "../../../validation/ForgotPasswordSchema";
import { resetPasswordSchema } from "../../../validation/ResetPasswordSchema";
import { useNavigate } from "react-router-dom";
import AuthProgressPanel from "../../../components/auth/AuthProgressPanel";
import { getAuthButtonSx, getAuthFieldSx } from "../../../components/auth/authFieldStyles";

export default function ForgotPassword() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [sentEmail, setSentEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [activeField, setActiveField] = useState("");
    const navigate = useNavigate();
    const sendCodeMutation = useSendCode();
    const resetPasswordMutation = useResetPassword();

    const sendCodeForm = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        mode: "onBlur",
        defaultValues: { email: "" },
    });

    const resetForm = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onBlur",
        defaultValues: { email: "", code: "", newPassword: "" },
    });

    const sendCodeValues = sendCodeForm.watch();
    const resetValues = resetForm.watch();
    const sendCodeProgress = sendCodeValues.email ? 100 : 0;
    const resetItems = [
        { label: t("Email"), filled: Boolean(resetValues.email) },
        { label: t("VerificationCode"), filled: Boolean(resetValues.code) },
        { label: t("NewPassword"), filled: Boolean(resetValues.newPassword) },
    ];
    const resetProgress =
        (resetItems.filter((item) => item.filled).length / resetItems.length) * 100;

    const handleSendCode = async ({ email }) => {
        setSuccessMessage("");
        await sendCodeMutation.mutateAsync(email);
        setSentEmail(email);
        resetForm.setValue("email", email);
    };

    const handleResetPassword = async (values) => {
        setSuccessMessage("");
        await resetPasswordMutation.mutateAsync(values);
        setSuccessMessage(t("PasswordResetSuccess"));
        setTimeout(() => navigate("/login"), 1200);
    };

    return (
        <AuthShell
            title={t("ResetPassword")}
            subtitle={t("RecoverySubtitle")}
            asideTitle={t("RecoveryAsideTitle")}
            asideText={t("RecoveryAsideText")}
        >
            <Stack spacing={4}>
                {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
                {sendCodeMutation.isError ? (
                    <Alert severity="error">
                        {sendCodeMutation.error?.response?.data?.message || t("FailedToSendCode")}
                    </Alert>
                ) : null}
                {resetPasswordMutation.isError ? (
                    <Alert severity="error">
                        {resetPasswordMutation.error?.response?.data?.message || t("FailedToResetPassword")}
                    </Alert>
                ) : null}

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 3,
                        transition: "transform 0.22s ease, box-shadow 0.22s ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[2],
                        },
                    }}
                >
                    <Stack component="form" spacing={2.25} onSubmit={sendCodeForm.handleSubmit(handleSendCode)}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {`1. ${t("SendCode")}`}
                        </Typography>
                        <AuthProgressPanel
                            progress={sendCodeProgress}
                            summary={t("RecoverySubtitle")}
                            items={[{ label: t("Email"), filled: Boolean(sendCodeValues.email) }]}
                        />
                        <TextField
                            {...sendCodeForm.register("email")}
                            label={t("Email")}
                            fullWidth
                            error={!!sendCodeForm.formState.errors.email}
                            helperText={sendCodeForm.formState.errors.email?.message}
                            onFocus={() => setActiveField("sendEmail")}
                            onBlur={() => setActiveField("")}
                            sx={getAuthFieldSx(theme, activeField === "sendEmail", Boolean(sendCodeValues.email))}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            disabled={sendCodeMutation.isPending}
                            sx={getAuthButtonSx(theme)}
                        >
                            {sendCodeMutation.isPending ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                t("SendCode")
                            )}
                        </Button>
                    </Stack>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 3,
                        transition: "transform 0.22s ease, box-shadow 0.22s ease",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: theme.shadows[2],
                        },
                    }}
                >
                    <Stack component="form" spacing={2.25} onSubmit={resetForm.handleSubmit(handleResetPassword)}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {`2. ${t("ResetPassword")}`}
                        </Typography>
                        <AuthProgressPanel
                            progress={resetProgress}
                            summary={sentEmail ? t("CodeSentTo", { email: sentEmail }) : t("ResetPassword")}
                            items={resetItems}
                        />
                        <TextField
                            {...resetForm.register("email")}
                            label={t("Email")}
                            fullWidth
                            error={!!resetForm.formState.errors.email}
                            helperText={
                                resetForm.formState.errors.email?.message ||
                                (sentEmail ? t("CodeSentTo", { email: sentEmail }) : "")
                            }
                            onFocus={() => setActiveField("resetEmail")}
                            onBlur={() => setActiveField("")}
                            sx={getAuthFieldSx(theme, activeField === "resetEmail", Boolean(resetValues.email))}
                        />
                        <TextField
                            {...resetForm.register("code")}
                            label={t("VerificationCode")}
                            fullWidth
                            error={!!resetForm.formState.errors.code}
                            helperText={resetForm.formState.errors.code?.message}
                            onFocus={() => setActiveField("code")}
                            onBlur={() => setActiveField("")}
                            sx={getAuthFieldSx(theme, activeField === "code", Boolean(resetValues.code))}
                        />
                        <TextField
                            {...resetForm.register("newPassword")}
                            label={t("NewPassword")}
                            type="password"
                            fullWidth
                            error={!!resetForm.formState.errors.newPassword}
                            helperText={resetForm.formState.errors.newPassword?.message}
                            onFocus={() => setActiveField("newPassword")}
                            onBlur={() => setActiveField("")}
                            sx={getAuthFieldSx(
                                theme,
                                activeField === "newPassword",
                                Boolean(resetValues.newPassword)
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={resetPasswordMutation.isPending}
                            sx={getAuthButtonSx(theme)}
                        >
                            {resetPasswordMutation.isPending ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                t("ResetPassword")
                            )}
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </AuthShell>
    );
}
