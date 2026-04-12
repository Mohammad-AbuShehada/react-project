import React from "react";
import {Alert,Box,Button,CardMedia,CircularProgress,Container,Dialog,DialogActions,DialogContent,DialogTitle,Divider,Grid,IconButton,Paper,Rating,Stack,TextField,Typography,useTheme,} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../../ui/Loader/Loader";
import useProduct from "../../hooks/useProduct";
import useWishlistStore from "../../store/useWishlistStore";
import useAddToCart from "../../hooks/useAddToCart";
import useAddReview from "../../hooks/useAddReview";
import useAuthStore from "../../store/useAuthStore";
import { reviewSchema } from "../../validation/ReviewSchema";

export default function ProductDetails() {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError, error } = useProduct(id);
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
    const token = useAuthStore((state) => state.token);
    const addReviewMutation = useAddReview(id);
    const toggleFavorite = useWishlistStore((state) => state.toggleFavorite);
    const isFavorite = useWishlistStore((state) => state.isFavorite(Number(id)));
    const [openGuestDialog, setOpenGuestDialog] = React.useState(false);
    const isArabic = i18n.language === "ar";

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(reviewSchema),
        defaultValues: {
            rating: 4,
            comment: "",
        },
    });

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    const product = data?.response;

    const onSubmitReview = async (values) => {
        await addReviewMutation.mutateAsync(values);
        reset({ rating: 4, comment: "" });
    };

    const handleAddToCart = () => {
        if (!token) {
            navigate("/login", { state: { from: `/product/${id}` } });
            return;
        }

        addToCart({
            ProductId: product.id,
            Count: 1,
        });
    };

    const handleFavoriteClick = () => {
        if (!token) {
            setOpenGuestDialog(true);
            return;
        }

        toggleFavorite(product);
    };

    return (
        <>
            <Box sx={{ py: { xs: 5, md: 8 } }}>
                <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                    <Stack spacing={6}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        border: 1,
                                        borderColor: "divider",
                                        overflow: "hidden",
                                        bgcolor: theme.palette.surface[100],
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product?.image}
                                        alt={product?.name || "product image"}
                                        sx={{
                                            width: "100%",
                                            aspectRatio: "1 / 1",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Stack spacing={3}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{ color: "text.secondary", fontSize: "0.78rem" }}
                                    >
                                        {t("ProductDetails")}
                                    </Typography>
                                    <Typography
                                        variant="h2"
                                        sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, textTransform: "uppercase" }}
                                    >
                                        {product?.name || "Unnamed product"}
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                                        <Rating readOnly value={Number(product?.rate) || 0} precision={0.5} />
                                        <Typography sx={{ color: "text.secondary" }}>
                                            {product?.reviews?.length || 0} {t("Reviews")}
                                        </Typography>
                                    </Stack>
                                    <Typography sx={{ fontSize: "1.35rem", fontWeight: 700 }}>
                                        ${Number(product?.price || 0).toFixed(2)}
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                                        {product?.description || "No description available for this product yet."}
                                    </Typography>

                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                        divider={<Divider flexItem orientation="vertical" sx={{ display: { xs: "none", sm: "block" } }} />}
                                    >
                                        <Box>
                                            <Typography sx={{ color: "text.secondary", mb: 0.5 }}>{t("Quantity")}</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>{product?.quantity}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={{ color: "text.secondary", mb: 0.5 }}>{t("Product")} ID</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>#{product?.id}</Typography>
                                        </Box>
                                    </Stack>

                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "center" } }}>
                                        <Button
                                            disabled={isAddingToCart}
                                            color="primary"
                                            variant="contained"
                                            onClick={handleAddToCart}
                                            sx={{ alignSelf: "flex-start" }}
                                        >
                                            {isAddingToCart ? (
                                                <CircularProgress size={22} color="inherit" />
                                            ) : (
                                                t("AddToCart")
                                            )}
                                        </Button>
                                        <IconButton
                                            onClick={handleFavoriteClick}
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                color: isFavorite ? "secondary.main" : "text.primary",
                                                transition: "transform 0.2s ease, background-color 0.2s ease, color 0.2s ease",
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                    transform: "scale(1.04)",
                                                },
                                            }}
                                            aria-label={isFavorite ? t("RemoveFromWishlist") : t("AddToWishlist")}
                                        >
                                            {isFavorite ? (
                                                <FavoriteRoundedIcon fontSize="small" />
                                            ) : (
                                                <FavoriteBorderRoundedIcon fontSize="small" />
                                            )}
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, lg: 7 }}>
                                <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                                    <Stack spacing={3}>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, textTransform: "uppercase" }}
                                        >
                                            {t("Reviews")}
                                        </Typography>
                                        <Stack spacing={2.5}>
                                            {product?.reviews?.length ? (
                                                product.reviews.map((review, index) => (
                                                    <Paper
                                                        key={`${review.userName}-${review.createdAt}-${index}`}
                                                        elevation={0}
                                                        sx={{ p: 2.5, bgcolor: theme.palette.surface[200], border: 1, borderColor: "divider" }}
                                                    >
                                                        <Stack spacing={1.25}>
                                                            <Stack
                                                                direction={{ xs: "column", sm: "row" }}
                                                                justifyContent="space-between"
                                                                spacing={1}
                                                            >
                                                                <Typography sx={{ fontWeight: 700 }}>
                                                                    {review.userName || "User"}
                                                                </Typography>
                                                                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>
                                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                                </Typography>
                                                            </Stack>
                                                            <Rating readOnly value={Number(review.rating) || 0} size="small" />
                                                            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                                                {review.comment}
                                                            </Typography>
                                                        </Stack>
                                                    </Paper>
                                                ))
                                            ) : (
                                                <Typography sx={{ color: "text.secondary" }}>
                                                    {t("NoReviewsYet")}
                                                </Typography>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, lg: 5 }}>
                                <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                                    <Stack spacing={3}>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, textTransform: "uppercase" }}
                                        >
                                            {t("AddReview")}
                                        </Typography>

                                        {!token ? (
                                            <Alert severity="info">{t("LoginToReview")}</Alert>
                                        ) : null}

                                        {addReviewMutation.isError ? (
                                            <Alert severity="error">
                                                {addReviewMutation.error?.response?.data?.message || "Failed to add review."}
                                            </Alert>
                                        ) : null}

                                        {addReviewMutation.isSuccess ? (
                                            <Alert severity="success">{t("ReviewAdded")}</Alert>
                                        ) : null}

                                        <Stack component="form" spacing={2.25} onSubmit={handleSubmit(onSubmitReview)}>
                                            <Controller
                                                name="rating"
                                                control={control}
                                                render={({ field }) => (
                                                    <Box>
                                                        <Typography sx={{ mb: 1, color: "text.secondary" }}>{t("TopRated")}</Typography>
                                                        <Rating
                                                            value={field.value}
                                                            onChange={(_, value) => field.onChange(value || 1)}
                                                        />
                                                        {errors.rating ? (
                                                            <Typography sx={{ color: "error.main", mt: 0.5, fontSize: "0.8rem" }}>
                                                                {errors.rating.message}
                                                            </Typography>
                                                        ) : null}
                                                    </Box>
                                                )}
                                            />

                                            <TextField
                                                {...register("comment")}
                                                label={t("Message")}
                                                multiline
                                                rows={5}
                                                fullWidth
                                                error={!!errors.comment}
                                                helperText={errors.comment?.message}
                                            />

                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={!token || isSubmitting || addReviewMutation.isPending}
                                            >
                                                {isSubmitting || addReviewMutation.isPending ? (
                                                    <CircularProgress size={22} color="inherit" />
                                                ) : (
                                                    t("SubmitReview")
                                                )}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>
            <Dialog open={openGuestDialog} onClose={() => setOpenGuestDialog(false)} fullWidth maxWidth="xs">
                <DialogTitle>{t("Wishlist")}</DialogTitle>
                <DialogContent>
                    <Stack spacing={1.25}>
                        <Typography sx={{ fontWeight: 700 }}>
                            {isArabic ? "المفضلة مرتبطة بحسابك." : "Favorites are linked to your account."}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                            {isArabic
                                ? "إذا أكملت بدون تسجيل دخول، فستبقى هذه المفضلة مؤقتة فقط خلال هذه الجلسة."
                                : "If you continue without logging in, this favorite will only last temporarily in this session."}
                        </Typography>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button
                        onClick={() => {
                            toggleFavorite(product, { allowGuest: true });
                            setOpenGuestDialog(false);
                        }}
                        variant="outlined"
                    >
                        {isArabic ? "المتابعة بدون تسجيل دخول" : "Continue without login"}
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenGuestDialog(false);
                            navigate("/login", { state: { from: `/product/${id}` } });
                        }}
                        variant="contained"
                    >
                        {t("Login")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
