import React from "react";
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function EmptyCartState({
    titleKey = "CartEmptyTitle",
    bodyKey = "CartEmptyBody",
    primaryTo = "/categories",
    primaryLabelKey = "GoShoppingNow",
    secondaryTo = "/",
    secondaryLabelKey = "MaybeLater",
}) {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 4, md: 6 },
                border: 1,
                borderColor: "divider",
                bgcolor: theme.palette.surface[200],
            }}
        >
            <Stack spacing={2.5} alignItems="center" textAlign="center" sx={{ maxWidth: 620, mx: "auto" }}>
                <Typography variant="h4" sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" } }}>
                    {t(titleKey)}
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                    {t(bodyKey)}
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button component={RouterLink} to={primaryTo} variant="contained">
                        {t(primaryLabelKey)}
                    </Button>
                    <Button component={RouterLink} to={secondaryTo} variant="outlined">
                        {t(secondaryLabelKey)}
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    );
}
