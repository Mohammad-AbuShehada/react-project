import React from "react";
import {Box,Button,Container,Divider,FormControlLabel,Grid,Paper,Radio,RadioGroup,Stack,TextField,Typography,} from "@mui/material";
import { useTranslation } from "react-i18next";
import Loader from "../../ui/Loader/Loader";
import useCart from "../../hooks/useCart";
import useCheckout from "../../hooks/useCheckout";


export default function Checkout() {
    const { t } = useTranslation();
    const { data, isError, error, isLoading } = useCart();
    const [paymentMethod, setPaymentMethod] = React.useState("CashOnDelivery");
    const { mutate: checkout, isPending } = useCheckout();

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;

    const shipping = paymentMethod === "Visa" ? 0 : 15;
    const total = Number(data.cartTotal || 0) + shipping;

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                <Stack spacing={5}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                            {t("Checkout")}
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: "2rem", md: "2.6rem" }, textTransform: "uppercase" }}
                        >
                            {t("Checkout")}
                        </Typography>
                    </Box>

                    <Grid container spacing={4} alignItems="flex-start">
                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                                <Stack spacing={3}>
                                    <Typography
                                        variant="h3"
                                        sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, textTransform: "uppercase" }}
                                    >
                                        {t("BillingDetails")}
                                    </Typography>

                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("FirstName")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("LastName")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("Company")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("CountryRegion")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField label={t("StreetAddress")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("TownCity")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("State")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("ZipCode")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField label={t("Phone")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField label={t("Email")} fullWidth />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField label={t("BillingNotes")} multiline rows={5} fullWidth />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Stack spacing={3}>
                                <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                                    <Stack spacing={2.5}>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, textTransform: "uppercase" }}
                                        >
                                            {t("OrderSummary")}
                                        </Typography>

                                        {data.items.map((item) => (
                                            <Stack key={item.productId} spacing={1.25}>
                                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                                    <Typography sx={{ color: "text.secondary" }}>{item.productName}</Typography>
                                                    <Typography sx={{ fontWeight: 700 }}>
                                                        ${Number(item.count * item.price || 0).toFixed(2)}
                                                    </Typography>
                                                </Stack>
                                                <Typography sx={{ color: "text.secondary", fontSize: "0.92rem" }}>
                                                    {t("Quantity")}: {item.count}
                                                </Typography>
                                                <Divider />
                                            </Stack>
                                        ))}

                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography sx={{ color: "text.secondary" }}>{t("Subtotal")}</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                ${Number(data.cartTotal || 0).toFixed(2)}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography sx={{ color: "text.secondary" }}>{t("Shipping")}</Typography>
                                            <Typography sx={{ fontWeight: 700 }}>
                                                ${Number(shipping).toFixed(2)}
                                            </Typography>
                                        </Stack>
                                        <Divider />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography sx={{ fontSize: "1.05rem", fontWeight: 700 }}>{t("Total")}</Typography>
                                            <Typography sx={{ fontSize: "1.15rem", fontWeight: 700 }}>
                                                ${Number(total).toFixed(2)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>

                                <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                                    <Stack spacing={2.5}>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" }, textTransform: "uppercase" }}
                                        >
                                            {t("Payment")}
                                        </Typography>

                                        <RadioGroup value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                                            <FormControlLabel value="Visa" control={<Radio />} label={t("CreditCard")} />
                                            <FormControlLabel
                                                value="CashOnDelivery"
                                                control={<Radio />}
                                                label={t("CashOnDelivery")}
                                            />
                                        </RadioGroup>

                                        {paymentMethod === "Visa" ? (
                                            <Stack spacing={2}>
                                                <TextField label={t("CardNumber")} fullWidth />
                                                <TextField label={t("NameOnCard")} fullWidth />
                                                <TextField label={t("ExpirationDate")} fullWidth />
                                                <TextField label={t("SecurityCode")} fullWidth />
                                            </Stack>
                                        ) : (
                                            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                                {t("CashPaymentHint")}
                                            </Typography>
                                        )}

                                        <Button variant="contained" disabled={isPending} onClick={() => checkout(paymentMethod)}>
                                            {isPending ? t("Processing") : t("PlaceOrder")}
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
}
