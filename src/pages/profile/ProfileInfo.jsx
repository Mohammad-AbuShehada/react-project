import React from "react";
import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export default function ProfileInfo() {
    const { t } = useTranslation();
    const theme = useTheme();
    const context = useOutletContext() || {};
    const profile = context.profile || {};

    const fields = [
        { label: t("FullName"), value: profile.fullName || t("NotProvided") },
        { label: t("Email"), value: profile.email || t("NotProvided") },
        { label: t("Phone"), value: profile.phoneNumber || t("NotProvided") },
        { label: t("City"), value: profile.city || t("NotProvided") },
    ];

    return (
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
    );
}
