import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18netx";
import useAuthStore from "../../store/useAuthStore";
import useCart from "../../hooks/useCart";
import useThemeStore from "../../store/useThemeStore";
import useWishlistStore from "../../store/useWishlistStore";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/categories" },
    { label: "Blog", to: "/blog" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

export default function Navbar() {
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const mode = useThemeStore((state) => state.mode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const wishlistCount = useWishlistStore((state) => state.items.length);
    const { data } = useCart();
    const drawerAnchor = i18n.language === "ar" ? "right" : "left";
    const isArabic = i18n.language === "ar";

    const cartCount = token ? data?.items?.length || 0 : 0;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const changeLanguage = () => {
        const nextLanguage = i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(nextLanguage);
    };

    const closeDrawer = () => {
        setMobileOpen(false);
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    borderBottom: 1,
                    borderColor: "divider",
                    backdropFilter: "blur(12px)",
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: "82px",
                        px: { xs: 2.5, md: 4, lg: isArabic ? "108px" : "165px" },
                        gap: { xs: 1, md: 1.5 },
                        justifyContent: "space-between",
                    }}
                >
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            sx={{ display: { xs: "inline-flex", md: "none" } }}
                            onClick={() => setMobileOpen(true)}
                            title={t("Menu")}
                        >
                            <MenuRoundedIcon fontSize="small" />
                        </IconButton>
                        <Link
                            component={RouterLink}
                            to="/"
                            underline="none"
                            color="inherit"
                            sx={{ flexShrink: 0 }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Box
                                    component="img"
                                    src="/Logo.svg"
                                    alt="Moon logo"
                                    sx={{
                                        width: 34,
                                        height: 34,
                                        objectFit: "contain",
                                        filter: mode === "dark" ? "brightness(0) invert(1)" : "none",
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: "1.1rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.12em",
                                    }}
                                >
                                    MOON
                                </Typography>
                            </Box>
                        </Link>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={0}
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            flex: "1 1 auto",
                            minWidth: 0,
                            columnGap: isArabic ? 2.4 : { md: 2.25, lg: 3.5 },
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                component={NavLink}
                                to={item.to}
                                end={item.to === "/"}
                                underline="none"
                                color="inherit"
                                sx={{
                                    fontSize: isArabic ? { md: "0.84rem", lg: "0.9rem" } : "0.9rem",
                                    color: "text.primary",
                                    whiteSpace: "nowrap",
                                    lineHeight: 1.2,
                                    flexShrink: 0,
                                    px: isArabic ? 0.5 : 0,
                                    pb: 0.35,
                                    borderBottom: "2px solid transparent",
                                    transition: "opacity 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                                    "&:hover": { opacity: 0.75 },
                                    "&.active": {
                                        color: "primary.main",
                                        borderColor: "primary.main",
                                        opacity: 1,
                                    },
                                }}
                            >
                                {t(item.label)}
                            </Link>
                        ))}
                    </Stack>

                    <Stack direction="row" spacing={{ xs: 0, sm: 0.5 }} sx={{ alignItems: "center" }}>
                        <IconButton color="inherit" onClick={changeLanguage} title={t("ChangeLanguage")}>
                            <TranslateOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="inherit" onClick={toggleTheme} title={t("ToggleTheme")}>
                            {mode === "light" ? (
                                <DarkModeOutlinedIcon fontSize="small" />
                            ) : (
                                <LightModeOutlinedIcon fontSize="small" />
                            )}
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to="/categories">
                            <SearchIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to={token ? "/profile" : "/login"}>
                            <PersonOutlineIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            component={RouterLink}
                            to="/wishlist"
                            sx={{ display: { xs: "none", sm: "inline-flex" } }}
                        >
                            <Badge badgeContent={wishlistCount} color="secondary">
                                {wishlistCount ? (
                                    <FavoriteRoundedIcon fontSize="small" />
                                ) : (
                                    <FavoriteBorderIcon fontSize="small" />
                                )}
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to={token ? "/cart" : "/login"}>
                            <Badge badgeContent={cartCount} color="secondary">
                                <ShoppingCartOutlinedIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        {token ? (
                            <Button
                                onClick={handleLogout}
                                color="inherit"
                                sx={{ display: { xs: "none", sm: "inline-flex" }, ml: 1 }}
                            >
                                {t("Logout")}
                            </Button>
                        ) : (
                            <Button
                                component={RouterLink}
                                to="/login"
                                color="inherit"
                                sx={{ display: { xs: "none", sm: "inline-flex" }, ml: 1 }}
                            >
                                {t("Login")}
                            </Button>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer anchor={drawerAnchor} open={mobileOpen} onClose={closeDrawer}>
                <Stack sx={{ width: 290, p: 3, height: "100%" }} spacing={2.5}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                            component="img"
                            src="/Logo.svg"
                            alt="Moon logo"
                            sx={{
                                width: 34,
                                height: 34,
                                objectFit: "contain",
                                filter: mode === "dark" ? "brightness(0) invert(1)" : "none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1.1rem",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                            }}
                        >
                            MOON
                        </Typography>
                    </Box>
                    <Divider />
                    {navLinks.map((item) => (
                        <Button
                            key={item.label}
                            component={NavLink}
                            to={item.to}
                            end={item.to === "/"}
                            onClick={closeDrawer}
                            color="inherit"
                            sx={{
                                justifyContent: "flex-start",
                                py: 1.2,
                                borderRadius: 2,
                                "&.active": {
                                    color: "primary.main",
                                    bgcolor: "action.selected",
                                },
                            }}
                        >
                            {t(item.label)}
                        </Button>
                    ))}
                    <Divider />
                    <Button
                        component={RouterLink}
                        to="/wishlist"
                        onClick={closeDrawer}
                        variant="text"
                        fullWidth
                        sx={{ display: { xs: "inline-flex", sm: "none" } }}
                    >
                        {t("Wishlist")}
                    </Button>
                    {token ? (
                        <Button
                            onClick={() => {
                                closeDrawer();
                                handleLogout();
                            }}
                            color="inherit"
                            fullWidth
                            sx={{ display: { xs: "inline-flex", sm: "none" } }}
                        >
                            {t("Logout")}
                        </Button>
                    ) : (
                        <Button
                            component={RouterLink}
                            to="/login"
                            onClick={closeDrawer}
                            color="inherit"
                            fullWidth
                            sx={{ display: { xs: "inline-flex", sm: "none" } }}
                        >
                            {t("Login")}
                        </Button>
                    )}
                </Stack>
            </Drawer>
        </>
    );
}
