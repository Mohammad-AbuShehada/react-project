import React from "react";
import {Box,Grid,Paper,Stack,Typography,useMediaQuery,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/uesCategories";
import HorizontalAutoSlider from "../common/HorizontalAutoSlider";
import Loader from "../../ui/Loader/Loader";

export default function CategoriesSection({ limit = 4 }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const useSliderLayout = useMediaQuery(theme.breakpoints.down("md"));
    const { data, isLoading, isError, error } = useCategories(limit);
    const categories = data?.response?.data || [];
    const categoryImages = [
        {
            src: "/TableWare_Card.svg",
            alt: "Elegant ceramic tableware collection display",
            caption: "Table styling essentials",
        },
        {
            src: "/Home_decor_Card.svg",
            alt: "Curated home decor ceramic styling",
            caption: "Quiet decor accents",
        },
        {
            src: "/holiday_Card.svg",
            alt: "Seasonal holiday ceramic arrangement",
            caption: "Seasonal hosting pieces",
        },
        {
            src: "/Collection_Card.svg",
            alt: "Editorial ceramic collection showcase",
            caption: "Collected forms and textures",
        },
    ];

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    return (
        <Stack spacing={5}>
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
                        {t("ShopByCategory")}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, textTransform: "uppercase" }}
                    >
                        {t("Categories")}
                    </Typography>
                </Box>
            </Stack>

            {useSliderLayout ? (
                <HorizontalAutoSlider
                    enabled={useSliderLayout}
                    items={categories}
                    itemWidth="min(82vw, 290px)"
                    renderItem={(category, index) => (
                        <Paper
                            elevation={0}
                            onClick={() => navigate(`/categories?categoryId=${category.id}`)}
                            sx={{
                                color: "inherit",
                                p: 3,
                                height: "100%",
                                border: 1,
                                borderColor: "divider",
                                cursor: "pointer",
                                bgcolor:
                                    index % 2 === 0 ? theme.palette.surface[100] : theme.palette.surface[200],
                                transition:
                                    "transform 0.26s ease, box-shadow 0.26s ease, border-color 0.26s ease, background-color 0.26s ease",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: theme.shadows[6],
                                    borderColor: "secondary.light",
                                },
                            }}
                        >
                            <Stack spacing={2}>
                                <Box
                                    sx={{
                                        aspectRatio: "1 / 1",
                                        overflow: "hidden",
                                        bgcolor: "background.paper",
                                        borderRadius: 2.5,
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={categoryImages[index % categoryImages.length].src}
                                        alt={`${category.name} - ${categoryImages[index % categoryImages.length].alt}`}
                                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>
                                <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", lineHeight: 1.7 }}>
                                    {categoryImages[index % categoryImages.length].caption}
                                </Typography>
                                <Stack spacing={1}>
                                    <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                                        {category.name}
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                        Category ID: {category.id}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    )}
                />
            ) : (
                <Grid container spacing={3}>
                    {categories.map((category, index) => (
                        <Grid key={category.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                            <Paper
                                elevation={0}
                                onClick={() => navigate(`/categories?categoryId=${category.id}`)}
                                sx={{
                                    color: "inherit",
                                    p: 3,
                                    height: "100%",
                                    border: 1,
                                    borderColor: "divider",
                                    cursor: "pointer",
                                    bgcolor:
                                        index % 2 === 0 ? theme.palette.surface[100] : theme.palette.surface[200],
                                    transition:
                                        "transform 0.26s ease, box-shadow 0.26s ease, border-color 0.26s ease, background-color 0.26s ease",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        boxShadow: theme.shadows[6],
                                        borderColor: "secondary.light",
                                    },
                                }}
                            >
                                <Stack spacing={2}>
                                    <Box
                                        sx={{
                                            aspectRatio: "1 / 1",
                                            overflow: "hidden",
                                            bgcolor: "background.paper",
                                            borderRadius: 2.5,
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={categoryImages[index % categoryImages.length].src}
                                            alt={`${category.name} - ${categoryImages[index % categoryImages.length].alt}`}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </Box>
                                    <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", lineHeight: 1.7 }}>
                                        {categoryImages[index % categoryImages.length].caption}
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                                            {category.name}
                                        </Typography>
                                        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                            Category ID: {category.id}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Stack>
    );
}
