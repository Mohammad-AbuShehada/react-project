import React from "react";
import { Chip, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";

export default function ProfileOrders() {
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const context = useOutletContext() || {};
    const profile = context.profile || {};
    const orders = Array.isArray(profile.orders) ? profile.orders : [];

    return (
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
            <Stack spacing={3}>
                <Stack spacing={0.75}>
                    <Typography variant="h3" sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
                        {t("OrderHistory")}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>{t("RecentOrders")}</Typography>
                </Stack>

                {orders.length ? (
                    <Grid container spacing={2.5}>
                        {orders
                            .slice()
                            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                            .map((order) => {
                                const orderDate = new Date(order.orderDate).toLocaleDateString(
                                    i18n.language === "ar" ? "ar" : "en-US",
                                    {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    }
                                );

                                let statusLabel = t("Unknown");
                                if (order.status !== null && order.status !== undefined && order.status !== "") {
                                    if (
                                        order.status === 3 ||
                                        String(order.status).toLowerCase() === "completed"
                                    ) {
                                        statusLabel = t("Completed");
                                    } else if (String(order.status).toLowerCase() === "active") {
                                        statusLabel = t("Active");
                                    } else {
                                        statusLabel = String(order.status);
                                    }
                                }

                                let paymentLabel = t("Pending");
                                if (
                                    order.paymentStatus !== null &&
                                    order.paymentStatus !== undefined &&
                                    order.paymentStatus !== ""
                                ) {
                                    const normalized = String(order.paymentStatus).toLowerCase();
                                    if (normalized === "paid") {
                                        paymentLabel = t("Completed");
                                    } else if (normalized === "unpaid") {
                                        paymentLabel = t("Pending");
                                    } else {
                                        paymentLabel = String(order.paymentStatus);
                                    }
                                }

                                const paymentColor = paymentLabel === t("Completed") ? "success" : "warning";
                                const statusColor = statusLabel === t("Completed") ? "success" : "default";

                                return (
                                    <Grid key={order.id} size={{ xs: 12, xl: 6 }}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2.75,
                                                height: "100%",
                                                border: 1,
                                                borderColor: "divider",
                                                bgcolor: theme.palette.surface[200],
                                            }}
                                        >
                                            <Stack spacing={2}>
                                                <Stack
                                                    direction={{ xs: "column", sm: "row" }}
                                                    justifyContent="space-between"
                                                    spacing={1.5}
                                                >
                                                    <Stack spacing={0.5}>
                                                        <Typography
                                                            sx={{
                                                                color: "text.secondary",
                                                                fontSize: "0.82rem",
                                                                letterSpacing: "0.06em",
                                                            }}
                                                        >
                                                            {t("OrderId")}
                                                        </Typography>
                                                        <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>
                                                            #{order.id}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        <Chip label={paymentLabel} color={paymentColor} variant="outlined" />
                                                        <Chip label={statusLabel} color={statusColor} variant="outlined" />
                                                    </Stack>
                                                </Stack>

                                                <Grid container spacing={2}>
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <Typography sx={{ color: "text.secondary", fontSize: "0.86rem" }}>
                                                            {t("AmountPaid")}
                                                        </Typography>
                                                        <Typography sx={{ fontWeight: 700 }}>
                                                            ${Number(order.amountPaid || 0).toFixed(2)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <Typography sx={{ color: "text.secondary", fontSize: "0.86rem" }}>
                                                            {t("OrderDate")}
                                                        </Typography>
                                                        <Typography sx={{ fontWeight: 700 }}>{orderDate}</Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <Typography sx={{ color: "text.secondary", fontSize: "0.86rem" }}>
                                                            {t("PaymentStatus")}
                                                        </Typography>
                                                        <Typography sx={{ fontWeight: 700 }}>{paymentLabel}</Typography>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, sm: 6 }}>
                                                        <Typography sx={{ color: "text.secondary", fontSize: "0.86rem" }}>
                                                            {t("OrderStatus")}
                                                        </Typography>
                                                        <Typography sx={{ fontWeight: 700 }}>{statusLabel}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                );
                            })}
                    </Grid>
                ) : (
                    <Typography sx={{ color: "text.secondary" }}>{t("OrdersEndpointMissing")}</Typography>
                )}
            </Stack>
        </Paper>
    );
}
