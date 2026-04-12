import React from "react";
import {Box,Button,Card,CardContent,CardMedia,Container,Grid,Pagination,Stack,Typography,useTheme,} from "@mui/material";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/common/PageHero";

const posts = [
    {
        id: 1,
        titleKey: "BlogPost1Title",
        excerptKey: "BlogPost1Excerpt",
        image: "/Hero_Blog.svg",
    },
    {
        id: 2,
        titleKey: "BlogPost2Title",
        excerptKey: "BlogPost2Excerpt",
        image: "/Blog_img.svg",
    },
    {
        id: 3,
        titleKey: "BlogPost3Title",
        excerptKey: "BlogPost3Excerpt",
        image: "/Content.svg",
    },
];

export default function Blog() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box>
            <PageHero
                eyebrow={t("FreshStories")}
                title={t("BlogHeroTitle")}
                description={t("BlogIntro")}
                breadcrumbs={[
                    { label: t("Home"), to: "/" },
                    { label: t("Blog") },
                ]}
            />

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 6, md: 8 } }}>
                <Stack spacing={5}>
                    <Grid container spacing={3}>
                        {posts.map((post) => (
                            <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 0,
                                        boxShadow: "none",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: theme.shadows[4],
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={post.image}
                                        alt={`${t(post.titleKey)} editorial ceramic article visual`}
                                        sx={{ aspectRatio: "1 / 0.8" }}
                                    />
                                    <CardContent sx={{ p: 3 }}>
                                        <Stack spacing={2}>
                                            <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", lineHeight: 1.7 }}>
                                                {post.id === 1
                                                    ? "A calm hero-led story around form, material, and hosting atmosphere."
                                                    : post.id === 2
                                                        ? "A cleaner composition focused on spacing, rhythm, and product framing."
                                                        : "A softer supporting visual that echoes the journal's refined mood."}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                {t(post.titleKey)}
                                            </Typography>
                                            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                                {t(post.excerptKey)}
                                            </Typography>
                                            <Button variant="outlined" sx={{ alignSelf: "flex-start" }}>
                                                {t("ReadMore")}
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Stack alignItems="center">
                        <Pagination count={3} shape="rounded" color="primary" />
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
