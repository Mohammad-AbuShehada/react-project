import React from "react";
import { Box, useTheme } from "@mui/material";
import useAutoScrollStrip from "../../hooks/useAutoScrollStrip";

const stripSx = {
    display: "flex",
    gap: 2,
    overflowX: "auto",
    overflowY: "hidden",
    px: 0.25,
    pb: 1.75,
    position: "relative",
    scrollSnapType: "x mandatory",
    scrollPaddingInline: "2px",
};

const edgeSx = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 26,
    zIndex: 1,
    pointerEvents: "none",
};

export default function HorizontalAutoSlider({
    enabled,
    items,
    itemWidth,
    renderItem,
}) {
    const theme = useTheme();
    const stripRef = useAutoScrollStrip(enabled, items.length);

    if (!enabled) {
        return null;
    }

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                sx={{
                    ...edgeSx,
                    left: 0,
                    background: `linear-gradient(90deg, ${theme.palette.slider.edgeOpaque} 0%, transparent 100%)`,
                }}
            />
            <Box
                sx={{
                    ...edgeSx,
                    right: 0,
                    background: `linear-gradient(270deg, ${theme.palette.slider.edgeOpaque} 0%, transparent 100%)`,
                }}
            />

            <Box
                ref={stripRef}
                className="moon-scroll-strip"
                sx={{
                    ...stripSx,
                    WebkitOverflowScrolling: "touch",
                    scrollBehavior: "smooth",
                }}
            >
                {items.map((item, index) => (
                    <Box
                        key={item.id || index}
                        className="moon-scroll-card"
                        sx={{
                            flex: `0 0 ${itemWidth}`,
                            minWidth: itemWidth,
                            scrollSnapAlign: "start",
                        }}
                    >
                        {renderItem(item, index)}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
