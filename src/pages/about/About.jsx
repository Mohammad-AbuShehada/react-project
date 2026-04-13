import React from "react";
import { Box, Container, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/common/PageHero";

export default function About() {
    const { t } = useTranslation();
    const theme = useTheme();
    const values = [
        { title: t("EditorialLayout"), text: t("AboutValue1") },
        { title: t("LiveBackend"), text: t("AboutValue2") },
        { title: t("ResponsiveBuild"), text: t("AboutValue3") },
    ];
    const timelineImages = ["/about_moon_1910.svg", "/about_moon_1990.svg", "/about_moon_2010.svg"];
    const team = [
        {
            src: "/Bernie_PATTERSON_CEO_Team.svg",
            name: "Bernie Patterson",
            role: "CEO",
            caption: "Guides the brand with a calm strategic view and a clear editorial standard.",
        },
        {
            src: "/Ophelia_Vase_Creative_Director_Team.svg",
            name: "Ophelia Vase",
            role: "Creative Director",
            caption: "Shapes the visual language so every product story feels collected and intentional.",
        },
        {
            src: "/Seren_Bowl_Marketing_Team.svg",
            name: "Seren Bowl",
            role: "Marketing Team",
            caption: "Translates the collection into campaigns that stay warm, soft, and premium.",
        },
        {
            src: "/CorbiN_HOSSAIN_Artist_Team.svg",
            name: "Corbin Hossain",
            role: "Artist",
            caption: "Keeps the tactile side of the brand visible through form, texture, and craft.",
        },
    ];

    return (
        <Box>
            <PageHero
                eyebrow={t("")}
                title={t("AboutProject")}
                description={t("AboutProjectBody")}
                breadcrumbs={[
                    { label: t("Home"), to: "/" },
                    { label: t("About") },
                ]}
            />

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 6, md: 8 } }}>
                <Stack spacing={8}>
                    <Grid container spacing={{ xs: 2.5, md: 3.5 }} alignItems="stretch">
                        <Grid size={{ xs: 12, xl: 6 }}>
                            <Stack spacing={1.25} sx={{ height: "100%" }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        height: "100%",
                                        overflow: "hidden",
                                        border: 1,
                                        borderColor: "divider",
                                        minHeight: { xs: 280, sm: 360, md: 460, xl: 520 },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={timelineImages[2]}
                                        alt="Moon ceramic story timeline featuring a curated heritage visual"
                                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Paper>
                                <Typography sx={{ color: "text.secondary", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 640 }}>
                                    A timeline-led visual that reflects the brand's crafted history and calm editorial tone.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, xl: 6 }}>
                            <Grid container spacing={{ xs: 2.5, md: 3 }}>
                                {timelineImages.slice(0, 2).map((image, index) => (
                                    <Grid key={image} size={{ xs: 12, md: 6, xl: 12 }}>
                                        <Stack spacing={1.25}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    overflow: "hidden",
                                                    border: 1,
                                                    borderColor: "divider",
                                                    bgcolor: theme.palette.surface[100],
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={image}
                                                    alt={`Moon archive visual ${index + 1} showing handcrafted ceramic history`}
                                                    sx={{
                                                        width: "100%",
                                                        aspectRatio: { xs: "1 / 0.8", sm: "1 / 0.7", xl: "1 / 0.62" },
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Paper>
                                            <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.7 }}>
                                                {index === 0
                                                    ? "A quiet archival frame that supports the brand's earlier visual language."
                                                    : "A later chapter that keeps the same handcrafted identity while feeling more refined."}
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        {values.map((item, index) => (
                            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 4,
                                        height: "100%",
                                        border: 1,
                                        borderColor: "divider",
                                        bgcolor: index % 2 === 0 ? theme.palette.surface[200] : theme.palette.surface[100],
                                    }}
                                >
                                    <Stack spacing={2}>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontSize: { xs: "1.15rem", md: "1.35rem" }, textTransform: "uppercase" }}
                                        >
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: "text.secondary", lineHeight: 1.9, fontSize: { xs: "0.95rem", md: "1rem" } }}>
                                            {item.text}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Stack spacing={3.5}>
                        <Stack spacing={1}>
                            <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                                Studio voices
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, textTransform: "uppercase" }}
                            >
                                The Team Behind Moon
                            </Typography>
                        </Stack>

                        <Grid container spacing={3}>
                            {team.map((member) => (
                                <Grid key={member.name} size={{ xs: 12, sm: 6, lg: 3 }}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            height: "100%",
                                            border: 1,
                                            borderColor: "divider",
                                            bgcolor: theme.palette.surface[100],
                                        }}
                                    >
                                        <Stack spacing={1.5}>
                                            <Box
                                                component="img"
                                                src={member.src}
                                                alt={`${member.name} ${member.role} portrait for Moon studio`}
                                                sx={{
                                                    width: "100%",
                                                    aspectRatio: "1 / 1.16",
                                                    objectFit: "cover",
                                                    borderRadius: 2.5,
                                                }}
                                            />
                                            <Stack spacing={0.5}>
                                                <Typography sx={{ fontWeight: 700 }}>{member.name}</Typography>
                                                <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                                                    {member.role}
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.7 }}>
                                                {member.caption}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
