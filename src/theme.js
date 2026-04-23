import { createTheme } from "@mui/material";

const paletteByMode = {
    light: {
        primary: "#45414d",
        secondary: "#8a7668",
        background: "#F7F6F5",
        paper: "#FCFBFA",
        textPrimary: "#2b2930",
        textSecondary: "#6f6a74",
        divider: "#e3ddd7",
        surface1: "#f1ece7",
        surface2: "#f8f5f2",
        muted: "#ece6e0",
        footerBackground: "#4b4652",
        footerPrimaryText: "#eee8e2",
        footerSecondaryText: "#d3cbc4",
        footerStrongText: "#ffffff",
        footerBorder: "#7a747d",
        footerHover: "rgba(255,255,255,0.06)",
        heroStart: "rgba(248,245,242,0.98)",
        heroEnd: "rgba(241,236,231,0.98)",
        authAsideStart: "rgba(154,136,124,0.94)",
        authAsideEnd: "rgba(97,90,104,1)",
        authContentStart: "rgba(252,251,250,0.98)",
        authContentEnd: "rgba(248,245,242,0.94)",
        authInverseText: "#ffffff",
        authInverseSoft: "rgba(255,255,255,0.82)",
        authInverseMuted: "rgba(255,255,255,0.78)",
        authGlowStrong: "radial-gradient(circle, rgba(255,255,255,0.26), rgba(255,255,255,0))",
        authGlowSoft: "radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0))",
        authButtonSheen: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.22) 50%, transparent 76%)",
        sliderEdgeOpaque: "rgba(247,246,245,0.94)",
        progressFilledBg: "rgba(138,118,104,0.12)",
        mediaOverlay: "rgba(252,251,250,0.9)",
        storyOneStart: "#efe6df",
        storyOneEnd: "#e0cfc2",
        storyTwoStart: "#d9c7bb",
        storyTwoEnd: "#bfa090",
    },
    dark: {
        primary: "#e5dcd3",
        secondary: "#c9b3a4",
        background: "#211f25",
        paper: "#2b2831",
        textPrimary: "#eee7e0",
        textSecondary: "#c5bdb6",
        divider: "rgba(255,255,255,0.11)",
        surface1: "#343039",
        surface2: "#3c3741",
        muted: "#47414b",
        footerBackground: "#343039",
        footerPrimaryText: "#eee7e0",
        footerSecondaryText: "#c7beb7",
        footerStrongText: "#eee7e0",
        footerBorder: "#5a545e",
        footerHover: "rgba(255,255,255,0.06)",
        heroStart: "rgba(60,55,65,0.96)",
        heroEnd: "rgba(43,40,49,0.96)",
        authAsideStart: "rgba(71,65,75,0.96)",
        authAsideEnd: "rgba(52,48,57,1)",
        authContentStart: "rgba(43,40,49,0.98)",
        authContentEnd: "rgba(52,48,57,0.96)",
        authInverseText: "#eee7e0",
        authInverseSoft: "rgba(255,255,255,0.82)",
        authInverseMuted: "rgba(255,255,255,0.78)",
        authGlowStrong: "radial-gradient(circle, rgba(255,255,255,0.26), rgba(255,255,255,0))",
        authGlowSoft: "radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0))",
        authButtonSheen: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.22) 50%, transparent 76%)",
        sliderEdgeOpaque: "rgba(33,31,37,0.96)",
        progressFilledBg: "rgba(138,118,104,0.12)",
        mediaOverlay: "rgba(43,40,49,0.88)",
        storyOneStart: "#3e3943",
        storyOneEnd: "#544a53",
        storyTwoStart: "#3f3431",
        storyTwoEnd: "#5b4b47",
    },
};

const commonTypography = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
        fontSize: "0.78rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
    },
    h1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        letterSpacing: "0.02em",
        lineHeight: 1.08,
    },
    h2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        letterSpacing: "0.02em",
        lineHeight: 1.1,
    },
    h3: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 700,
        letterSpacing: "0.02em",
        lineHeight: 1.2,
    },
    subtitle1: {
        fontSize: "0.9rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
    },
};

const getTheme = (mode, direction = "ltr") =>
    createTheme({
        direction,
        palette: {
            mode,
            primary: {
                main: paletteByMode[mode].primary,
                contrastText: mode === "dark" ? "#19181d" : "#FCFBFA",
            },
            secondary: {
                main: paletteByMode[mode].secondary,
                contrastText: mode === "dark" ? "#19181d" : "#FCFBFA",
            },
            background: {
                default: paletteByMode[mode].background,
                paper: paletteByMode[mode].paper,
            },
            text: {
                primary: paletteByMode[mode].textPrimary,
                secondary: paletteByMode[mode].textSecondary,
            },
            divider: paletteByMode[mode].divider,
            action: {
                hover: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(69,65,77,0.045)",
                selected: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(69,65,77,0.08)",
            },
            surface: {
                100: paletteByMode[mode].surface1,
                200: paletteByMode[mode].surface2,
                300: paletteByMode[mode].muted,
            },
            footer: {
                background: paletteByMode[mode].footerBackground,
                primary: paletteByMode[mode].footerPrimaryText,
                secondary: paletteByMode[mode].footerSecondaryText,
                strong: paletteByMode[mode].footerStrongText,
                border: paletteByMode[mode].footerBorder,
                hover: paletteByMode[mode].footerHover,
            },
            hero: {
                start: paletteByMode[mode].heroStart,
                end: paletteByMode[mode].heroEnd,
            },
            auth: {
                asideStart: paletteByMode[mode].authAsideStart,
                asideEnd: paletteByMode[mode].authAsideEnd,
                contentStart: paletteByMode[mode].authContentStart,
                contentEnd: paletteByMode[mode].authContentEnd,
                inverseText: paletteByMode[mode].authInverseText,
                inverseSoft: paletteByMode[mode].authInverseSoft,
                inverseMuted: paletteByMode[mode].authInverseMuted,
                glowStrong: paletteByMode[mode].authGlowStrong,
                glowSoft: paletteByMode[mode].authGlowSoft,
                buttonSheen: paletteByMode[mode].authButtonSheen,
            },
            slider: {
                edgeOpaque: paletteByMode[mode].sliderEdgeOpaque,
            },
            progress: {
                filledBg: paletteByMode[mode].progressFilledBg,
            },
            media: {
                overlay: paletteByMode[mode].mediaOverlay,
            },
            story: {
                oneStart: paletteByMode[mode].storyOneStart,
                oneEnd: paletteByMode[mode].storyOneEnd,
                twoStart: paletteByMode[mode].storyTwoStart,
                twoEnd: paletteByMode[mode].storyTwoEnd,
            },
        },
        spacing: 8,
        shape: {
            borderRadius: 14,
        },
        typography: commonTypography,
        shadows: [
            "none",
            "0 8px 20px rgba(26, 22, 28, 0.04)",
            "0 10px 24px rgba(26, 22, 28, 0.05)",
            "0 14px 30px rgba(26, 22, 28, 0.06)",
            "0 18px 38px rgba(26, 22, 28, 0.08)",
            "0 20px 44px rgba(26, 22, 28, 0.10)",
            ...Array(19).fill("0 20px 44px rgba(26, 22, 28, 0.10)"),
        ],
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: paletteByMode[mode].background,
                        color: paletteByMode[mode].textPrimary,
                    },
                    "html[dir='rtl'] .MuiInputBase-input": {
                        textAlign: "right",
                        direction: "rtl",
                    },
                    "html[dir='rtl'] .MuiInputBase-input::placeholder": {
                        textAlign: "right",
                        direction: "rtl",
                        opacity: 1,
                    },
                    "html[dir='rtl'] textarea.MuiInputBase-input": {
                        textAlign: "right",
                        direction: "rtl",
                    },
                    "html[dir='rtl'] .MuiFormHelperText-root": {
                        textAlign: "right",
                        marginRight: 14,
                        marginLeft: 0,
                    },
                    "html[dir='rtl'] .MuiInputLabel-root": {
                        right: 14,
                        left: "auto",
                        transformOrigin: "top right",
                    },
                    "html[dir='rtl'] .MuiInputLabel-outlined": {
                        transform: "translate(-14px, 16px) scale(1)",
                    },
                    "html[dir='rtl'] .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        transform: "translate(-14px, -9px) scale(0.75)",
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                        paddingInline: 18,
                        paddingBlock: 12,
                        transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
                        "&:hover": {
                            transform: "translateY(-1px)",
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        borderRadius: 22,
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 22,
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        backgroundColor: paletteByMode[mode].paper,
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: paletteByMode[mode].secondary,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderWidth: 1,
                            borderColor: paletteByMode[mode].primary,
                        },
                    },
                },
            },
        },
    });

export default getTheme;
