import React from "react";
import {Alert,Box,Button,Container,Divider,FormControlLabel,Grid,Paper,Radio,RadioGroup,Stack,TextField,Typography,} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../../ui/Loader/Loader";
import useCart from "../../hooks/useCart";
import useCheckout from "../../hooks/useCheckout";
import EmptyCartState from "../../components/cart/EmptyCartState";
import { createCheckoutSchema } from "../../validation/CheckoutSchema";


export default function Checkout() {
    const { t } = useTranslation();
    const { data, isError, error, isLoading } = useCart();
    const [serverErrors, setServerErrors] = React.useState([]);
    const schema = React.useMemo(() => createCheckoutSchema(t), [t]);
    const { mutateAsync: checkout, isPending } = useCheckout();
    const hasItems = Boolean(data?.items?.length);
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            company: "",
            countryRegion: "",
            streetAddress: "",
            townCity: "",
            state: "",
            zipCode: "",
            phone: "",
            email: "",
            billingNotes: "",
            paymentMethod: "Cash",
            cardNumber: "",
            nameOnCard: "",
            expirationDate: "",
            securityCode: "",
        },
    });
    const paymentMethod = watch("paymentMethod");

    if (isLoading) return <Loader />;
    if (isError) return <Box color="error.main">{error.message}</Box>;
    if (!hasItems) {
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

                        <EmptyCartState
                            titleKey="CheckoutEmptyTitle"
                            bodyKey="CheckoutEmptyBody"
                            primaryTo="/categories"
                            primaryLabelKey="GoShoppingNow"
                            secondaryTo="/cart"
                            secondaryLabelKey="ReturnToCart"
                        />
                    </Stack>
                </Container>
            </Box>
        );
    }

    const shipping = paymentMethod === "Visa" ? 0 : 15;
    const total = Number(data.cartTotal || 0) + shipping;

    const getServerErrors = (errorResponse) => {
        const payload = errorResponse?.response?.data;
        if (errorResponse?.message && !payload) return [errorResponse.message];
        if (Array.isArray(payload?.errors)) return payload.errors;
        if (payload?.errors && typeof payload.errors === "object") {
            return Object.values(payload.errors).flat().filter(Boolean);
        }
        return [payload?.message || payload?.title || errorResponse?.message || t("SomethingWentWrong")];
    };

    const onSubmit = async (values) => {
        try {
            setServerErrors([]);
            await checkout(values);
        } catch (submitError) {
            setServerErrors(getServerErrors(submitError));
        }
    };

    return (
        <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" } }}>
                <Stack component="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
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

                    {serverErrors.length > 0
                        ? serverErrors.map((errorItem, index) => (
                            <Alert key={`${errorItem}-${index}`} severity="error" variant="outlined">
                                {errorItem}
                            </Alert>
                        ))
                        : null}

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
                                            <TextField
                                                {...register("firstName")}
                                                label={t("FirstName")}
                                                fullWidth
                                                error={!!errors.firstName}
                                                helperText={errors.firstName?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("lastName")}
                                                label={t("LastName")}
                                                fullWidth
                                                error={!!errors.lastName}
                                                helperText={errors.lastName?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("company")}
                                                label={t("Company")}
                                                fullWidth
                                                error={!!errors.company}
                                                helperText={errors.company?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("countryRegion")}
                                                label={t("CountryRegion")}
                                                fullWidth
                                                error={!!errors.countryRegion}
                                                helperText={errors.countryRegion?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                {...register("streetAddress")}
                                                label={t("StreetAddress")}
                                                fullWidth
                                                error={!!errors.streetAddress}
                                                helperText={errors.streetAddress?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("townCity")}
                                                label={t("TownCity")}
                                                fullWidth
                                                error={!!errors.townCity}
                                                helperText={errors.townCity?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("state")}
                                                label={t("State")}
                                                fullWidth
                                                error={!!errors.state}
                                                helperText={errors.state?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("zipCode")}
                                                label={t("ZipCode")}
                                                fullWidth
                                                error={!!errors.zipCode}
                                                helperText={errors.zipCode?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <TextField
                                                {...register("phone")}
                                                label={t("Phone")}
                                                fullWidth
                                                error={!!errors.phone}
                                                helperText={errors.phone?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                {...register("email")}
                                                label={t("Email")}
                                                fullWidth
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                            />
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <TextField
                                                {...register("billingNotes")}
                                                label={t("BillingNotes")}
                                                multiline
                                                rows={5}
                                                fullWidth
                                                error={!!errors.billingNotes}
                                                helperText={errors.billingNotes?.message}
                                            />
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

                                        <Controller
                                            name="paymentMethod"
                                            control={control}
                                            render={({ field }) => (
                                                <RadioGroup {...field}>
                                                    <FormControlLabel value="Visa" control={<Radio />} label={t("CreditCard")} />
                                                    <FormControlLabel value="Cash" control={<Radio />} label={t("CashOnDelivery")} />
                                                </RadioGroup>
                                            )}
                                        />

                                        {paymentMethod === "Visa" ? (
                                            <Stack spacing={2}>
                                                <TextField
                                                    {...register("cardNumber")}
                                                    label={t("CardNumber")}
                                                    fullWidth
                                                    error={!!errors.cardNumber}
                                                    helperText={errors.cardNumber?.message}
                                                />
                                                <TextField
                                                    {...register("nameOnCard")}
                                                    label={t("NameOnCard")}
                                                    fullWidth
                                                    error={!!errors.nameOnCard}
                                                    helperText={errors.nameOnCard?.message}
                                                />
                                                <TextField
                                                    {...register("expirationDate")}
                                                    label={t("ExpirationDate")}
                                                    fullWidth
                                                    error={!!errors.expirationDate}
                                                    helperText={errors.expirationDate?.message}
                                                />
                                                <TextField
                                                    {...register("securityCode")}
                                                    label={t("SecurityCode")}
                                                    fullWidth
                                                    error={!!errors.securityCode}
                                                    helperText={errors.securityCode?.message}
                                                />
                                            </Stack>
                                        ) : (
                                            <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                                                {t("CashPaymentHint")}
                                            </Typography>
                                        )}

                                        <Button variant="contained" type="submit" disabled={isPending || !isValid}>
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
