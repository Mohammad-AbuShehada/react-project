export function getAuthFieldSx(theme, active, filled) {
    return {
        "& .MuiOutlinedInput-root": {
            transition:
                "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background-color 0.22s ease",
            bgcolor: filled ? theme.palette.background.paper : "transparent",
            boxShadow: active ? theme.shadows[3] : "none",
            transform: active ? "translateY(-1px)" : "translateY(0)",
        },
        "& .MuiInputLabel-root": {
            color: active ? "text.primary" : "text.secondary",
            transition: "color 0.2s ease",
        },
    };
}

export function getAuthButtonSx(theme) {
    return {
        position: "relative",
        overflow: "hidden",
        boxShadow: theme.shadows[3],
        transition: "transform 0.24s ease, box-shadow 0.24s ease",
        "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: theme.palette.auth.buttonSheen,
            transform: "translateX(-130%)",
            transition: "transform 0.55s ease",
        },
        "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows[5],
        },
        "&:hover::before": {
            transform: "translateX(130%)",
        },
    };
}
