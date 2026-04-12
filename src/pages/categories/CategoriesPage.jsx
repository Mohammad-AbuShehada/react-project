import React from "react";
import {Box,Button,Chip,Container,MenuItem,Paper,Stack,TextField,Typography,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import CategoriesSection from "../../components/categories/CategoriesSection";
import Products from "../../components/products/Products";
import useCategories from "../../hooks/uesCategories";
import Loader from "../../ui/Loader/Loader";

const sortOptions = [
    { value: "", label: "Default order" },
    { value: "priceAsc", label: "Price: Low to high" },
    { value: "priceDesc", label: "Price: High to low" },
    { value: "ratingDesc", label: "Top rated" },
    { value: "nameAsc", label: "Name: A to Z" },
];

export default function CategoriesPage() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { data, isLoading, isError, error } = useCategories(20);

    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const sort = searchParams.get("sort") || "";

    const updateParam = (key, value) => {
        const next = new URLSearchParams(searchParams);
        if (value === "" || value === null || value === undefined) {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        setSearchParams(next);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    const categories = data?.response?.data || [];
    const selectedCategory = categories.find((item) => String(item.id) === String(categoryId));

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                <Stack spacing={8}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                            {t("ProductCatalog")}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, textTransform: "uppercase" }}
                        >
                            {t("SearchFilterBrowse")}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", mt: 1.5, maxWidth: 720, lineHeight: 1.8 }}>
                            This page is wired to the real backend queries we verified: search, categoryId,
                            and price filtering. Sorting is exposed in the UI and also applied safely on the
                            client so the experience stays consistent.
                        </Typography>
                    </Box>

                    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                        <Stack spacing={3}>
                            <Stack
                                direction={{ xs: "column", md: "row" }}
                                spacing={2}
                                alignItems={{ xs: "stretch", md: "center" }}
                            >
                                <TextField
                                    label={t("SearchProducts")}
                                    value={search}
                                    onChange={(event) => updateParam("search", event.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    select
                                    label={t("Category")}
                                    value={categoryId}
                                    onChange={(event) => updateParam("categoryId", event.target.value)}
                                    sx={{ minWidth: { xs: "100%", md: 220 } }}
                                >
                                    <MenuItem value="">{t("AllCategories")}</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label={t("Sort")}
                                    value={sort}
                                    onChange={(event) => updateParam("sort", event.target.value)}
                                    sx={{ minWidth: { xs: "100%", md: 220 } }}
                                >
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {t(
                                                option.value === ""
                                                    ? "DefaultOrder"
                                                    : option.value === "priceAsc"
                                                        ? "PriceLowToHigh"
                                                        : option.value === "priceDesc"
                                                            ? "PriceHighToLow"
                                                            : option.value === "ratingDesc"
                                                                ? "TopRated"
                                                                : "NameAZ"
                                            )}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                                <TextField
                                    label={t("MinPrice")}
                                    type="number"
                                    value={minPrice}
                                    onChange={(event) => updateParam("minPrice", event.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label={t("MaxPrice")}
                                    type="number"
                                    value={maxPrice}
                                    onChange={(event) => updateParam("maxPrice", event.target.value)}
                                    fullWidth
                                />
                            </Stack>

                            <Stack
                                direction={{ xs: "column", md: "row" }}
                                spacing={2}
                                justifyContent="space-between"
                                alignItems={{ xs: "flex-start", md: "center" }}
                            >
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {selectedCategory ? (
                                        <Chip label={`${t("Category")}: ${selectedCategory.name}`} onDelete={() => updateParam("categoryId", "")} />
                                    ) : null}
                                    {search ? <Chip label={`${t("Search")}: ${search}`} onDelete={() => updateParam("search", "")} /> : null}
                                    {minPrice ? <Chip label={`${t("MinPrice")}: ${minPrice}`} onDelete={() => updateParam("minPrice", "")} /> : null}
                                    {maxPrice ? <Chip label={`${t("MaxPrice")}: ${maxPrice}`} onDelete={() => updateParam("maxPrice", "")} /> : null}
                                </Stack>
                                <Button variant="outlined" onClick={clearFilters}>
                                    {t("ClearFilters")}
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>

                    <Products
                        title={selectedCategory ? `${selectedCategory.name} ${t("Products")}` : t("Products")}
                        queryOptions={{ search, categoryId, minPrice, maxPrice, sort, limit: 24 }}
                        emptyTitle={t("NoProductsMatched")}
                        emptyDescription={t("TryDifferentFilter")}
                    />

                    <CategoriesSection limit={8} />
                </Stack>
            </Container>
        </Box>
    );
}
