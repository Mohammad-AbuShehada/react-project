import React from "react";
import { Box, Button, Divider, Link, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const footerGroups = [
    { title: "FooterAbout", links: ["Mission", "OurTeam", "Awards", "Testimonials", "PrivacyPolicy"] },
    {
        title: "FooterServices",
        links: ["CeramicSets", "HomeDecor", "GiftBoxes", "CustomOrders", "BrandCollabs"],
    },
    {
        title: "FooterCollections",
        links: ["Tableware", "HolidayEdit", "KitchenRoom", "VaseCollection", "NewArrivals"],
    },
];

export default function Footer() {
    const { t } = useTranslation();
    const theme = useTheme();
    const footerPalette = theme.palette.footer;

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: footerPalette.background,
                color: footerPalette.primary,
                px: { xs: 3, md: 6, lg: "165px" },
                pt: { xs: 7, md: 9 },
            }}
        >
            <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={{ xs: 5, lg: 8 }}
                justifyContent="space-between"
                sx={{ pb: 6 }}
            >
                <Stack spacing={3} sx={{ maxWidth: 320 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                            component="img"
                            src="/Logo.svg"
                            alt="Moon logo"
                            sx={{ width: 34, height: 34, objectFit: "contain", filter: "brightness(0) invert(1)" }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                color: "inherit",
                                fontSize: "1.05rem",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                            }}
                        >
                            MOON
                        </Typography>
                    </Box>
                    <Typography sx={{ color: footerPalette.secondary, lineHeight: 1.8, fontSize: "0.95rem" }}>
                        {t("FooterIntro")}
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            alignSelf: "flex-start",
                            color: "inherit",
                            borderColor: "currentColor",
                            "&:hover": {
                                borderColor: "currentColor",
                                bgcolor: footerPalette.hover,
                            },
                        }}
                    >
                        {t("GetStarted")}
                    </Button>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 4, sm: 7, lg: 9 }}
                    sx={{ flexWrap: "wrap" }}
                >
                    {footerGroups.map((group) => (
                        <Stack key={group.title} spacing={2.5} sx={{ minWidth: 170 }}>
                            <Typography
                                sx={{
                                    color: footerPalette.strong,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    fontSize: "0.92rem",
                                }}
                            >
                                {t(group.title)}
                            </Typography>
                            {group.links.map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    underline="none"
                                    sx={{
                                        color: footerPalette.secondary,
                                        fontSize: "0.95rem",
                                        lineHeight: 1.9,
                                        "&:hover": { color: footerPalette.strong },
                                    }}
                                >
                                    {t(item)}
                                </Link>
                            ))}
                        </Stack>
                    ))}
                </Stack>
            </Stack>

            <Divider sx={{ borderColor: footerPalette.border }} />

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                justifyContent="space-between"
                sx={{ py: 3.5, color: footerPalette.secondary }}
            >
                <Typography sx={{ fontSize: "0.95rem" }}>
                    {t("CopyrightNotice")}
                </Typography>
                <Stack direction="row" spacing={3}>
                    <Link href="#" underline="hover" sx={{ color: "inherit" }}>
                        {t("TermsAndConditions")}
                    </Link>
                    <Link href="#" underline="hover" sx={{ color: "inherit" }}>
                        {t("PrivacyPolicy")}
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
}
