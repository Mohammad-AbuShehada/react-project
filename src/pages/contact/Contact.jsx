import React from "react";
import {Box,Button,Container,Grid,Paper,Stack,TextField,Typography,useTheme,} from "@mui/material";
import { t } from "i18next";
export default function Contact() {
    const theme = useTheme();

    return (
        <Box>
            <Box
                sx={{
                    position: "relative",
                    minHeight: { xs: 560, md: 620 },
                    overflow: "hidden",
                }}
            >
                <Box
                    component="img"
                    src="/Slider_Contact.svg"
                    alt="Moon contact hero showroom visual"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />

                <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, height: "100%" }}>
                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            minHeight: { xs: 560, md: 620 },
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: "100%", sm: 320, md: 380, lg: 420 },
                                maxWidth: "100%",
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: theme.shadows[4],
                            }}
                        >
                            <Box
                                component="img"
                                src="/Content_above_of_Slider.svg"
                                alt="Editorial ceramic composition layered above the contact hero"
                                sx={{
                                    width: "100%",
                                    minHeight: { xs: 240, sm: 340, md: 560, lg: 620 },
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                        </Box>
                    </Box>
                </Container>

            </Box>

            <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 6, lg: "165px" }, pb: { xs: 6, md: 8 } }}>
                <Stack spacing={4}>
                    <Grid container spacing={4} id="contact-form">
                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Paper
                                elevation={0}
                                sx={{ p: 3.5, border: 1, borderColor: "divider", bgcolor: theme.palette.surface[200] }}
                            >
                                <Stack spacing={1.5}>
                                    <Typography sx={{ fontWeight: 700 }}>{t("Email")}</Typography>
                                    <Typography sx={{ color: "text.secondary" }}>hello@moon-store.demo</Typography>
                                    <Typography sx={{ fontWeight: 700, mt: 1 }}>{t("Phone")}</Typography>
                                    <Typography sx={{ color: "text.secondary" }}>+970 000 000 000</Typography>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
                                <Stack spacing={2.5}>
                                    <TextField label={t("FullName")} fullWidth />
                                    <TextField label={t("Email")} fullWidth />
                                    <TextField label={t("Subject")} fullWidth />
                                    <TextField label={t("Message")} multiline rows={6} fullWidth />
                                    <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
                                        {t("SendMessage")}
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Box>
    );
}
