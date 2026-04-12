import React from "react";
import {Box,Breadcrumbs,Container,Link,Stack,Typography,useTheme,} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function PageHero({ eyebrow, title, description, breadcrumbs = [] }) {
    const theme = useTheme();

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                <Stack spacing={3.5}>
                    {breadcrumbs.length ? (
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumbs.map((item, index) =>
                                item.to ? (
                                    <Link
                                        key={`${item.label}-${index}`}
                                        component={RouterLink}
                                        to={item.to}
                                        underline="hover"
                                        color="inherit"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <Typography key={`${item.label}-${index}`} color="text.secondary">
                                        {item.label}
                                    </Typography>
                                )
                            )}
                        </Breadcrumbs>
                    ) : null}

                    <Box
                        sx={{
                            p: { xs: 4, md: 6 },
                            border: 1,
                            borderColor: "divider",
                            background: `linear-gradient(135deg, ${theme.palette.hero.start} 0%, ${theme.palette.hero.end} 100%)`,
                        }}
                    >
                        <Stack spacing={2} sx={{ maxWidth: 760 }}>
                            {eyebrow ? (
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: "text.secondary", fontSize: "0.78rem" }}
                                >
                                    {eyebrow}
                                </Typography>
                            ) : null}
                            <Typography
                                variant="h1"
                                sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, textTransform: "uppercase" }}
                            >
                                {title}
                            </Typography>
                            {description ? (
                                <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                    {description}
                                </Typography>
                            ) : null}
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
