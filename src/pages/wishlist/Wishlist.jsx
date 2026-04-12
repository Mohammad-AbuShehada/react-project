import React from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/common/PageHero";
import ProductCard from "../../components/products/ProductCard";
import useWishlistStore from "../../store/useWishlistStore";

export default function Wishlist() {
    const { t } = useTranslation();
    const theme = useTheme();
    const items = useWishlistStore((state) => state.items);

    return (
        <Box>
            <PageHero
                eyebrow={t("Wishlist")}
                title={t("MyWishlist")}
                description={t("WishlistEmptyBody")}
                breadcrumbs={[
                    { label: t("Home"), to: "/" },
                    { label: t("Wishlist") },
                ]}
            />

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 6, md: 8 } }}>
                {items.length ? (
                    <Grid container spacing={3}>
                        {items.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 6 },
                            border: 1,
                            borderColor: "divider",
                            bgcolor: theme.palette.surface[200],
                        }}
                    >
                        <Stack spacing={2.5} alignItems="center" textAlign="center" sx={{ maxWidth: 540, mx: "auto" }}>
                            <Typography variant="h4" sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" } }}>
                                {t("WishlistEmptyTitle")}
                            </Typography>
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                {t("WishlistEmptyBody")}
                            </Typography>
                            <Button component={RouterLink} to="/categories" variant="contained">
                                {t("ContinueBrowsing")}
                            </Button>
                        </Stack>
                    </Paper>
                )}
            </Container>
        </Box>
    );
}
