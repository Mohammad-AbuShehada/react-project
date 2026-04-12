import React from "react";
import {Box,Button,Container,Divider,IconButton,Paper,Stack,Typography,} from "@mui/material";
import { useTranslation } from "react-i18next";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader/Loader";
import useCart from "../../hooks/useCart";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCatrItem";

export default function Cart() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data, isError, error, isLoading } = useCart();
    const { mutate: removeItem, isPending } = useRemoveFromCart();
    const { mutate: updateItem, isPending: isPendingUpdate } = useUpdateCartItem();

    const handleUpdateQty = (productId, action) => {
        const item = data.items.find((cartItem) => cartItem.productId == productId);
        if (!item) return;
        const nextCount = action === "-" ? item.count - 1 : item.count + 1;
        if (nextCount <= 0) {
            removeItem(productId);
            return;
        }
        updateItem({ productId, count: nextCount });
    };

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                <Stack spacing={5}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                            {t("YourOrder")}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, textTransform: "uppercase" }}
                        >
                            {t("MyCart")}
                        </Typography>
                    </Box>

                    <Stack direction={{ xs: "column", xl: "row" }} spacing={4} alignItems="flex-start">
                        <Stack spacing={2.5} sx={{ flex: 1, width: "100%" }}>
                            {data.items.map((item) => (
                                <Paper
                                    key={item.productId}
                                    elevation={0}
                                    sx={{ p: { xs: 2.5, md: 3 }, border: 1, borderColor: "divider" }}
                                >
                                    <Stack spacing={2.5}>
                                        <Stack
                                            direction={{ xs: "column", md: "row" }}
                                            justifyContent="space-between"
                                            spacing={2}
                                        >
                                            <Stack spacing={0.75}>
                                                <Typography sx={{ fontWeight: 700 }}>{item.productName}</Typography>
                                                <Typography sx={{ color: "text.secondary" }}>
                                                    {t("Price")}: ${Number(item.price || 0).toFixed(2)}
                                                </Typography>
                                            </Stack>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                ${Number(item.count * item.price || 0).toFixed(2)}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <IconButton
                                                    size="small"
                                                    disabled={isPendingUpdate}
                                                    onClick={() => handleUpdateQty(item.productId, "-")}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ minWidth: 28, textAlign: "center", fontWeight: 700 }}>
                                                    {item.count}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    disabled={isPendingUpdate}
                                                    onClick={() => handleUpdateQty(item.productId, "+")}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Stack>

                                            <Button
                                                disabled={isPending}
                                                color="error"
                                                variant="outlined"
                                                onClick={() => removeItem(item.productId)}
                                            >
                                                {t("Remove")}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>

                        <Paper
                            elevation={0}
                            sx={{
                                width: "100%",
                                maxWidth: 380,
                                p: { xs: 3, md: 4 },
                                border: 1,
                                borderColor: "divider",
                                position: { xl: "sticky" },
                                top: 110,
                            }}
                        >
                            <Stack spacing={2.5}>
                                <Typography
                                    variant="h3"
                                    sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, textTransform: "uppercase" }}
                                >
                                    {t("CartTotals")}
                                </Typography>
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography sx={{ color: "text.secondary" }}>{t("Items")}</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>{data.items.length}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography sx={{ color: "text.secondary" }}>{t("Subtotal")}</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>
                                        ${Number(data.cartTotal || 0).toFixed(2)}
                                    </Typography>
                                </Stack>
                                <Button variant="contained" onClick={() => navigate("/checkout")}>
                                    {t("ProceedToCheckout")}
                                </Button>
                                <Button variant="outlined" onClick={() => navigate("/")}>
                                    {t("ContinueShopping")}
                                </Button>
                            </Stack>
                        </Paper>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
