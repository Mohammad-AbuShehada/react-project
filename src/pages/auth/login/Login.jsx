import React, { useState } from "react";
import {Container,Box,Typography,TextField,Button,CircularProgress,Paper,} from "@mui/material"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../../validation/LoginSchema"
import axiosInstance from "../../../api/axiosInstance"

export default function Login() {
    const [serverError, setServerError] = useState([]);

    const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
    });

    const loginForm = async (values) => {
    try {
        const response = await axiosInstance.post(
        `/auth/Account/Login`,
        values
    );
        console.log("response", response);
    } catch (error) {
    setServerError(error.response?.data?.errors || ["Invalid credentials"]);
    }
};

    return (
    <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
                Welcome Back
            </Typography>

        {serverError?.length > 0 && (
            <Box mt={2}>
            {serverError.map((err, index) => (
                <Typography key={index} color="error" variant="body2">
                {err}
                </Typography>
            ))}
            </Box>
        )}

        <Box
            component="form"
            onSubmit={handleSubmit(loginForm)}
            display="flex"
            flexDirection="column"
            gap={2}
            mt={3}
        >
        <TextField
            {...register("email")}
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
        />

        <TextField
            {...register("password")}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
        />

        <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            disabled={isSubmitting}
        >
            {isSubmitting ? <CircularProgress size={24} /> : "Login"}
        </Button>
        </Box>
    </Paper>
    </Container>
);
}
