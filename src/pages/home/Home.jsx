import React from "react";
import {Box,Button,Container,Grid,Paper,Stack,TextField,Typography,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import CategoriesSection from "../../components/categories/CategoriesSection";
import Products from "../../components/products/Products";

export default function Home() {
    const { t } = useTranslation();
    const theme = useTheme();
    const craftedGallery = [
        {
            src: "/Warrick_White_Vase_20.svg",
            alt: "Tall Warrick white ceramic vase styled in a premium editorial layout",
            caption: "A tall silhouette that gives the edit a sculptural focal point.",
        },
        {
            src: "/Warrick_White_Vase_14.svg",
            alt: "Medium Warrick white ceramic vase for calm home styling",
            caption: "A quieter companion piece designed for softer shelf styling.",
        },
        {
            src: "/Tall_Cream_Ceramic_Vase.svg",
            alt: "Tall cream ceramic vase shown in a refined collection display",
            caption: "Warm cream tones that soften the whole collection instantly.",
        },
        {
            src: "/Small_Ecru_Ceramic_Compote.svg",
            alt: "Small ecru ceramic compote displayed as a tabletop accent",
            caption: "A compact form that adds depth without visual weight.",
        },
        {
            src: "/Rounded_Dual_Handled_Vase.svg",
            alt: "Rounded dual handled ceramic vase in a premium product composition",
            caption: "Rounded handles create a more expressive and collectible profile.",
        },
        {
            src: "/Porcelain_Dinner_Plate.svg",
            alt: "Porcelain dinner plate featured in a styled tableware set",
            caption: "A clean porcelain plate that anchors the tableware story.",
        },
        {
            src: "/Marin_White_Dinner_Plate.svg",
            alt: "Marin white dinner plate displayed in a calm editorial scene",
            caption: "A brighter finish that keeps the setting crisp and balanced.",
        },
        {
            src: "/Luana_Bowl.svg",
            alt: "Luana ceramic bowl arranged in a minimal editorial composition",
            caption: "A versatile bowl shape that adds softness to layered hosting scenes.",
        },
    ];
    const splitStories = [
        {
            id: "story-one",
            title: t("ChristmasCollectionTitle"),
            body: t("ChristmasCollectionBody"),
            imageSrc: "/Image.svg",
            imageAlt: "Ceramic product arrangement for the Moon storefront",
            imageCaption: "Balanced composition inspired by the editorial product story",
            imageBg: `linear-gradient(135deg, ${theme.palette.story.oneStart} 0%, ${theme.palette.story.oneEnd} 100%)`,
        },
        {
            id: "craft-story",
            title: t("VietnamCraftTitle"),
            body: t("VietnamCraftBody"),
            imageSrc: "/Content.svg",
            imageAlt: "Editorial ceramic composition showing the Moon collection direction",
            imageCaption: "A softer visual layer that mirrors the crafted brand direction",
            imageBg: `linear-gradient(135deg, ${theme.palette.story.twoStart} 0%, ${theme.palette.story.twoEnd} 100%)`,
        },
    ];

    return (
        <Box sx={{ bgcolor: "background.default" }}>
            <Box
                sx={{
                    position: "relative",
                    minHeight: { xs: 620, md: 640 },
                    overflow: "hidden",
                }}
            >
                <Box
                    component="img"
                    src="/Slider.svg"
                    alt="Moon hero showroom with ceramic styling and editorial furniture composition"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
                <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, height: "100%" }}>
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            minHeight: { xs: 620, md: 640 },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "100%", sm: 320, md: 380, lg: 420 },
                                maxWidth: "100%",
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: theme.shadows[4],
                            }}
                        >
                            <Box
                                component="img"
                                src="/Content.svg"
                                alt="Editorial ceramic content composition"
                                sx={{
                                    width: "100%",
                                    minHeight: { xs: 240, sm: 340, md: 560, lg: 640 },
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, py: { xs: 8, md: 10 } }}>
                <CategoriesSection />
            </Container>

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 8, md: 10 } }}>
                <Grid container id={splitStories[0].id} sx={{ bgcolor: "background.paper", alignItems: "stretch" }}>
                    <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                minHeight: { xs: 320, md: 348 },
                                p: { xs: 4, md: 7 },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Stack spacing={2} alignItems="center">
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: "text.secondary", textAlign: "center", fontSize: "0.78rem" }}
                                >
                                    {splitStories[0].eyebrow}
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: "2rem", md: "2.5rem" },
                                        textTransform: "uppercase",
                                        textAlign: "center",
                                        maxWidth: 560,
                                    }}
                                >
                                    {splitStories[0].title}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        textAlign: "center",
                                        maxWidth: 580,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {splitStories[0].body}
                                </Typography>
                                <Button variant="outlined" sx={{ mt: 1 }}>
                                    {t("ShopNow")}
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
                        <Box
                            sx={{
                                minHeight: { xs: 320, md: 348 },
                                position: "relative",
                                overflow: "hidden",
                                background: splitStories[0].imageBg,
                            }}
                        >
                            <Box
                                component="img"
                                src={splitStories[0].imageSrc}
                                alt={splitStories[0].imageAlt}
                                sx={{
                                    position: "absolute",
                                    inset: { xs: 18, md: 22 },
                                    width: "calc(100% - 36px)",
                                    height: "calc(100% - 36px)",
                                    objectFit: "cover",
                                    borderRadius: 3,
                                    boxShadow: theme.shadows[4],
                                }}
                            />
                            <Paper
                                elevation={0}
                                sx={{
                                    position: "absolute",
                                    left: { xs: 18, md: 22 },
                                    right: { xs: 18, md: 22 },
                                    bottom: { xs: 18, md: 22 },
                                    p: 1.5,
                                    bgcolor: "media.overlay",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <Typography sx={{ color: "text.secondary", fontSize: "0.86rem", lineHeight: 1.7 }}>
                                    {splitStories[0].imageCaption}
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container
                id="featured-products"
                maxWidth={false}
                sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 8, md: 10 } }}
            >
                <Products title={t("FeaturedProducts")} queryOptions={{ limit: 6 }} />
            </Container>

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 8, md: 10 } }}>
                <Grid container id={splitStories[1].id} sx={{ bgcolor: "background.paper", alignItems: "stretch" }}>
                    <Grid size={{ xs: 12 }} order={{ xs: 1, md: 1 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                minHeight: { xs: 320, md: 348 },
                                p: { xs: 4, md: 7 },
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Stack spacing={2} alignItems="center">
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: "text.secondary", textAlign: "center", fontSize: "0.78rem" }}
                                >
                                    {splitStories[1].eyebrow}
                                </Typography>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: "2rem", md: "2.5rem" },
                                        textTransform: "uppercase",
                                        textAlign: "center",
                                        maxWidth: 560,
                                    }}
                                >
                                    {splitStories[1].title}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        textAlign: "center",
                                        maxWidth: 580,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {splitStories[1].body}
                                </Typography>
                                <Button variant="outlined" sx={{ mt: 1 }}>
                                    {t("LearnMore")}
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 8, md: 10 } }}>
                <Products title={t("CatalogPreview")} compact queryOptions={{ limit: 12 }} />
            </Container>

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 8, md: 10 } }}>
                <Stack spacing={3.5}>
                    <Stack spacing={1}>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                            Crafted forms
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, textTransform: "uppercase" }}
                        >
                            Ceramic Highlights
                        </Typography>
                    </Stack>

                    <Grid container spacing={3}>
                        {craftedGallery.map((item) => (
                            <Grid key={item.src} size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        height: "100%",
                                        border: 1,
                                        borderColor: "divider",
                                        bgcolor: "background.paper",
                                        transition: "transform 0.24s ease, box-shadow 0.24s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: theme.shadows[4],
                                        },
                                    }}
                                >
                                    <Stack spacing={1.5}>
                                        <Box
                                            component="img"
                                            src={item.src}
                                            alt={item.alt}
                                            sx={{
                                                width: "100%",
                                                aspectRatio: "1 / 1.05",
                                                objectFit: "cover",
                                                borderRadius: 2.5,
                                                bgcolor: theme.palette.surface[100],
                                            }}
                                        />
                                        <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.7 }}>
                                            {item.caption}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
            </Container>

            <Box id="newsletter" sx={{ py: { xs: 8, md: 10 } }}>
                <Container maxWidth="md">
                    <Stack spacing={3.5} alignItems="center" textAlign="center">
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "text.secondary", fontSize: "0.78rem" }}
                        >
                            {t("SignUpToUs")}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: "2rem", md: "2.6rem" },
                                textTransform: "uppercase",
                            }}
                        >
                            {t("ForNewsCollectionsMore")}
                        </Typography>
                        <TextField
                            placeholder={t("EnterYourEmail")}
                            variant="standard"
                            fullWidth
                            sx={{
                                maxWidth: 520,
                                "& .MuiInputBase-root": {
                                    justifyContent: "center",
                                    textAlign: "center",
                                    fontSize: "1rem",
                                },
                                "& .MuiInputBase-input": {
                                    textAlign: "center",
                                    pb: 1.5,
                                },
                            }}
                        />
                        <Button variant="outlined" color="primary">
                            {t("SignUp")}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
