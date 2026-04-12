import React from "react";
import { Box, Button, Container, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import Loader from "../../ui/Loader/Loader";

const tabs = [
    { label: "Info", to: "/profile" },
    { label: "Orders", to: "/profile/orders" },
];

export default function Profile() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { pathname } = useLocation();
    const { data, isLoading, isError, error } = useProfile();
    const profile = data?.response || data || {};

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;
    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                <Stack spacing={4}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                            {t("AccountArea")}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: "2rem", md: "2.6rem" } }}
                        >
                            {t("MyProfile")}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mt: 1.5 }}>
                            {profile.fullName || profile.userName || t("ManageProfileDetails")}
                        </Typography>
                    </Box>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 1,
                            border: 1,
                            borderColor: "divider",
                            bgcolor: theme.palette.surface[200],
                        }}
                    >
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {tabs.map((tab) => {
                                const active = pathname === tab.to;
                                return (
                                    <Button
                                        key={tab.to}
                                        component={RouterLink}
                                        to={tab.to}
                                        variant={active ? "contained" : "text"}
                                    >
                                        {t(tab.label)}
                                    </Button>
                                );
                            })}
                        </Stack>
                    </Paper>

                    <Outlet context={{ profile }} />
                </Stack>
            </Container>
        </Box>
    );
}
