import React from "react";
import { Alert, Button, Grid, Paper, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useChangeEmail from "../../hooks/useChangeEmail";
import useChangePassword from "../../hooks/useChangePassword";
import { createChangeEmailSchema } from "../../validation/ChangeEmailSchema";
import { createChangePasswordSchema } from "../../validation/ChangePasswordSchema";

export default function ProfileInfo() {
    const { t } = useTranslation();
    const theme = useTheme();
    const context = useOutletContext() || {};
    const profile = context.profile || {};
    const [emailFeedback, setEmailFeedback] = React.useState({ type: "", message: "" });
    const [passwordFeedback, setPasswordFeedback] = React.useState({ type: "", message: "" });
    const changeEmailSchema = React.useMemo(() => createChangeEmailSchema(t), [t]);
    const changePasswordSchema = React.useMemo(() => createChangePasswordSchema(t), [t]);
    const { mutateAsync: changeEmail, isPending: isChangingEmail } = useChangeEmail();
    const { mutateAsync: changePassword, isPending: isChangingPassword } = useChangePassword();

    const fields = [
        { label: t("FullName"), value: profile.fullName || t("NotProvided") },
        { label: t("Email"), value: profile.email || t("NotProvided") },
        { label: t("Phone"), value: profile.phoneNumber || t("NotProvided") },
        { label: t("City"), value: profile.city || t("NotProvided") },
    ];

    const emailForm = useForm({
        resolver: yupResolver(changeEmailSchema),
        mode: "onBlur",
        defaultValues: {
            newEmail: profile.email || "",
        },
    });

    const passwordForm = useForm({
        resolver: yupResolver(changePasswordSchema),
        mode: "onBlur",
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    React.useEffect(() => {
        emailForm.reset({
            newEmail: profile.email || "",
        });
    }, [emailForm, profile.email]);

    const collectErrorMessage = (error, fallback) => {
        const payload = error?.response?.data;
        if (payload?.message) return payload.message;
        if (payload?.errors && typeof payload.errors === "object") {
            const firstError = Object.values(payload.errors).flat().find(Boolean);
            if (firstError) return firstError;
        }
        return error?.message || fallback;
    };

    const submitEmail = async (values) => {
        try {
            setEmailFeedback({ type: "", message: "" });
            await changeEmail(values);
            setEmailFeedback({ type: "success", message: t("EmailUpdatedSuccess") });
        } catch (error) {
            setEmailFeedback({
                type: "error",
                message: collectErrorMessage(error, t("EmailUpdatedError")),
            });
        }
    };

    const submitPassword = async (values) => {
        try {
            setPasswordFeedback({ type: "", message: "" });
            await changePassword(values);
            passwordForm.reset();
            setPasswordFeedback({ type: "success", message: t("PasswordUpdatedSuccess") });
        } catch (error) {
            setPasswordFeedback({
                type: "error",
                message: collectErrorMessage(error, t("PasswordUpdatedError")),
            });
        }
    };

    return (
        <Stack spacing={3}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                <Stack spacing={3}>
                    <Typography variant="h3" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
                        {t("AccountInformation")}
                    </Typography>
                    <Grid container spacing={2.5}>
                        {fields.map((field) => (
                            <Grid key={field.label} size={{ xs: 12, sm: 6 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2.75,
                                        height: "100%",
                                        border: 1,
                                        borderColor: "divider",
                                        bgcolor: theme.palette.surface[200],
                                    }}
                                >
                                    <Stack spacing={0.75}>
                                        <Typography
                                            sx={{
                                                color: "text.secondary",
                                                fontSize: "0.86rem",
                                                letterSpacing: "0.06em",
                                            }}
                                        >
                                            {field.label}
                                        </Typography>
                                        <Typography
                                            sx={{ fontWeight: 700, wordBreak: "break-word", fontSize: "1.02rem" }}
                                        >
                                            {field.value}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                <Stack component="form" spacing={3} onSubmit={emailForm.handleSubmit(submitEmail)}>
                    <Stack spacing={0.75}>
                        <Typography variant="h3" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
                            {t("ChangeEmail")}
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>{t("ChangeEmailHint")}</Typography>
                    </Stack>

                    {emailFeedback.message ? (
                        <Alert severity={emailFeedback.type || "info"} variant="outlined">
                            {emailFeedback.message}
                        </Alert>
                    ) : null}

                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <TextField
                                {...emailForm.register("newEmail")}
                                label={t("NewEmail")}
                                fullWidth
                                error={!!emailForm.formState.errors.newEmail}
                                helperText={emailForm.formState.errors.newEmail?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isChangingEmail}
                                sx={{ height: "100%", minHeight: 56 }}
                            >
                                {t("UpdateEmail")}
                            </Button>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                <Stack component="form" spacing={3} onSubmit={passwordForm.handleSubmit(submitPassword)}>
                    <Stack spacing={0.75}>
                        <Typography variant="h3" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
                            {t("ChangePassword")}
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>{t("ChangePasswordHint")}</Typography>
                    </Stack>

                    {passwordFeedback.message ? (
                        <Alert severity={passwordFeedback.type || "info"} variant="outlined">
                            {passwordFeedback.message}
                        </Alert>
                    ) : null}

                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                {...passwordForm.register("currentPassword")}
                                label={t("CurrentPassword")}
                                type="password"
                                fullWidth
                                error={!!passwordForm.formState.errors.currentPassword}
                                helperText={passwordForm.formState.errors.currentPassword?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                {...passwordForm.register("newPassword")}
                                label={t("NewPassword")}
                                type="password"
                                fullWidth
                                error={!!passwordForm.formState.errors.newPassword}
                                helperText={passwordForm.formState.errors.newPassword?.message}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                {...passwordForm.register("confirmNewPassword")}
                                label={t("ConfirmNewPassword")}
                                type="password"
                                fullWidth
                                error={!!passwordForm.formState.errors.confirmNewPassword}
                                helperText={passwordForm.formState.errors.confirmNewPassword?.message}
                            />
                        </Grid>
                    </Grid>

                    <Button type="submit" variant="contained" disabled={isChangingPassword} sx={{ alignSelf: "flex-start" }}>
                        {t("UpdatePassword")}
                    </Button>
                </Stack>
            </Paper>
        </Stack>
    );
}
