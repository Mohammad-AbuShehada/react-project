import React from "react";
import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";

export default function AuthShell({ title, subtitle, asideTitle, asideText, children }) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 164px)",
                display: "flex",
                alignItems: "center",
                py: { xs: 4, md: 8 },
                px: { xs: 2.5, md: 4 },
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "background.paper",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "minmax(320px, 420px) 1fr" },
                    }}
                >
                    <Box
                        sx={{
                            p: { xs: 4, md: 5 },
                            background: `linear-gradient(180deg, ${theme.palette.auth.asideStart} 0%, ${theme.palette.auth.asideEnd} 100%)`,
                            color: theme.palette.auth.inverseText,
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            className="moon-pulse"
                            sx={{
                                position: "absolute",
                                width: 220,
                                height: 220,
                                borderRadius: "50%",
                                top: -70,
                                right: -80,
                                background: theme.palette.auth.glowStrong,
                            }}
                        />
                        <Box
                            className="moon-float"
                            sx={{
                                position: "absolute",
                                width: 160,
                                height: 160,
                                borderRadius: "42% 58% 52% 48% / 38% 42% 58% 62%",
                                bottom: -30,
                                left: -30,
                                background: theme.palette.auth.glowSoft,
                            }}
                        />
                        <Stack spacing={3}>
                            <Typography
                                variant="subtitle1"
                                sx={{ color: theme.palette.auth.inverseMuted, fontSize: "0.78rem" }}
                            >
                                Moon account
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{
                                    color: theme.palette.auth.inverseText,
                                    fontSize: { xs: "2rem", md: "2.4rem" },
                                    textTransform: "uppercase",
                                }}
                            >
                                {asideTitle}
                            </Typography>
                            <Typography sx={{ color: theme.palette.auth.inverseSoft, lineHeight: 1.9 }}>
                                {asideText}
                            </Typography>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            p: { xs: 4, md: 6 },
                            background: `linear-gradient(180deg, ${theme.palette.auth.contentStart} 0%, ${theme.palette.auth.contentEnd} 100%)`,
                        }}
                    >
                        <Stack spacing={1.5} sx={{ mb: 4 }}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                                    textTransform: "uppercase",
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>{subtitle}</Typography>
                        </Stack>
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
