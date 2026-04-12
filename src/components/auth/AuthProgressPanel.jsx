import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function AuthProgressPanel({ progress = 0, summary, items = [] }) {
    return (
        <Stack
            spacing={1.5}
            sx={{
                p: 2,
                border: 1,
                borderColor: "divider",
                bgcolor: (theme) => theme.palette.surface[200],
                borderRadius: 3,
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>{summary}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.82rem" }}>
                    {Math.round(progress)}%
                </Typography>
            </Stack>

            <Box
                sx={{
                    height: 8,
                    bgcolor: "action.hover",
                    borderRadius: 999,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        width: `${progress}%`,
                        height: "100%",
                        borderRadius: 999,
                        bgcolor: "secondary.main",
                        transition: "width 0.28s ease",
                    }}
                />
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {items.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            px: 1.25,
                            py: 0.85,
                            borderRadius: 999,
                            fontSize: "0.8rem",
                            lineHeight: 1,
                            border: 1,
                            borderColor: item.filled ? "secondary.light" : "divider",
                            bgcolor: item.filled ? "progress.filledBg" : "background.paper",
                            color: item.filled ? "text.primary" : "text.secondary",
                            transition: "all 0.22s ease",
                        }}
                    >
                        {item.label}
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
