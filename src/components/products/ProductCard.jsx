import React from "react";
import {Box,Button,Card,CardContent,CardMedia,Dialog,DialogActions,DialogContent,DialogTitle,IconButton,Rating,Stack,Tooltip,Typography,useTheme,}
from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useWishlistStore from "../../store/useWishlistStore";
import useAuthStore from "../../store/useAuthStore";

export default function ProductCard({ product }) {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const [openGuestDialog, setOpenGuestDialog] = React.useState(false);
    const isFavorite = useWishlistStore((state) => state.isFavorite(product.id));
    const toggleFavorite = useWishlistStore((state) => state.toggleFavorite);
    const isArabic = i18n.language === "ar";

    const handleFavoriteClick = () => {
        if (!token) {
            setOpenGuestDialog(true);
            return;
        }

        toggleFavorite(product);
    };

    const handleContinueGuest = () => {
        toggleFavorite(product, { allowGuest: true });
        setOpenGuestDialog(false);
    };

    const handleLogin = () => {
        setOpenGuestDialog(false);
        navigate("/login", { state: { from: `/product/${product.id}` } });
    };

    return (
        <>
            <Card
                sx={{
                    height: "100%",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 3,
                    boxShadow: "none",
                    overflow: "hidden",
                    transition:
                        "transform 0.26s ease, box-shadow 0.26s ease, border-color 0.26s ease, background-color 0.26s ease",
                    "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: theme.shadows[6],
                        borderColor: "secondary.light",
                    },
                    "&:hover .moon-product-image": {
                        transform: "scale(1.04)",
                    },
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name || "product image"}
                        className="moon-product-image"
                        sx={{
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                            bgcolor: theme.palette.surface[100],
                            transition: "transform 0.35s ease",
                        }}
                    />
                    <Tooltip title={isFavorite ? t("RemoveFromWishlist") : t("AddToWishlist")}>
                        <IconButton
                            onClick={handleFavoriteClick}
                            sx={{
                                position: "absolute",
                                top: 14,
                                right: 14,
                                bgcolor: theme.palette.background.paper,
                                border: "1px solid",
                                borderColor: "divider",
                                transition: "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
                                color: isFavorite ? "secondary.main" : "text.primary",
                                "&:hover": {
                                    bgcolor: theme.palette.surface[200],
                                    transform: "scale(1.08)",
                                    boxShadow: theme.shadows[2],
                                },
                            }}
                        >
                            {isFavorite ? (
                                <FavoriteRoundedIcon fontSize="small" />
                            ) : (
                                <FavoriteBorderRoundedIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                </Box>
                <CardContent sx={{ p: 3 }}>
                    <Stack spacing={1.5}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 700,
                                minHeight: 48,
                            }}
                        >
                            {product.name || "Unnamed product"}
                        </Typography>
                        <Rating value={Number(product.rate) || 0} precision={0.5} readOnly size="small" />
                        <Typography sx={{ fontWeight: 700, color: "text.primary" }}>
                            ${Number(product.price || 0).toFixed(2)}
                        </Typography>
                        <Button component={RouterLink} to={`/product/${product.id}`} variant="outlined">
                            {t("Details")}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <Dialog open={openGuestDialog} onClose={() => setOpenGuestDialog(false)} fullWidth maxWidth="xs">
                <DialogTitle>
                    {t("Wishlist")}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={1.25}>
                        <Typography sx={{ fontWeight: 700 }}>
                            {isArabic ? "المفضلة مرتبطة بحسابك." : "Favorites are linked to your account."}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                            {isArabic
                                ? "إذا أكملت بدون تسجيل دخول، فستكون هذه المفضلة مؤقتة فقط ولن تُحفظ كعنصر مفضلة حقيقي داخل حسابك."
                                : "If you continue without logging in, this favorite will only be temporary and will not be saved as a real wishlist item."}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={handleContinueGuest} variant="outlined">
                        {isArabic ? "المتابعة بدون تسجيل دخول" : "Continue without login"}
                    </Button>
                    <Button onClick={handleLogin} variant="contained">
                        {t("Login")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
