import React from "react";
import {Box,Button,Grid,Paper,Stack,Typography,useMediaQuery,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import Loader from "../../ui/Loader/Loader";
import useProducts from "../../hooks/useProducts";
import HorizontalAutoSlider from "../common/HorizontalAutoSlider";
import ProductCard from "./ProductCard";

export default function Products({
    title = "Products",
    compact = false,
    queryOptions = {},
    emptyTitle = "No products found",
    emptyDescription = "Try changing the search or filter values.",
}) {
    const { t } = useTranslation();
    const theme = useTheme();
    const useSliderLayout = useMediaQuery(theme.breakpoints.down("md"));
    const { data, isLoading, isError, error } = useProducts(queryOptions);

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    const products = [...(data?.response?.data || [])];

    if (queryOptions.sort === "priceAsc") {
        products.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (queryOptions.sort === "priceDesc") {
        products.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (queryOptions.sort === "ratingDesc") {
        products.sort((a, b) => Number(b.rate || 0) - Number(a.rate || 0));
    } else if (queryOptions.sort === "nameAsc") {
        products.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
    }

    return (
        <Stack spacing={compact ? 3 : 5}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
            >
                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: "text.secondary", fontSize: "0.78rem" }}
                    >
                        {t("LiveCatalog")}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "1.8rem", md: compact ? "2rem" : "2.4rem" },
                            textTransform: "uppercase",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
                {!compact ? (
                    <Button component={RouterLink} to="/categories" variant="outlined">
                        {t("Categories")}
                    </Button>
                ) : null}
            </Stack>

            {products.length ? (
                useSliderLayout ? (
                    <HorizontalAutoSlider
                        enabled={useSliderLayout}
                        items={products}
                        itemWidth="min(84vw, 310px)"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                ) : (
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                )
            ) : (
                <Paper
                    elevation={0}
                    sx={{ p: 4, border: 1, borderColor: "divider", textAlign: "center" }}
                >
                    <Stack spacing={1.5}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {emptyTitle || t("NoProductsMatched")}
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                            {emptyDescription || t("TryDifferentFilter")}
                        </Typography>
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}
