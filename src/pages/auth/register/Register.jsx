import React, { useState } from "react";
import {Container,Box,Typography,TextField,Button,CircularProgress,Paper,} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../validation/RegisterSchema";

export default function Register() {
    const [serverError, setServerError] = useState([]);

    const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
    });
    const registerForm = async (values) => {
    try {
        const response = await axios.post(
        `https://knowledgeshop.runasp.net/api/auth/Account/Register`,
        values
        );
        console.log("response", response);
    } catch (error) {
        setServerError(error.response?.data?.errors || ["Something went wrong"]);
    }
};

    return (
    <Container maxWidth="sm">
    <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold">
            Create Account
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
            onSubmit={handleSubmit(registerForm)}
            display="flex"
            flexDirection="column"
            gap={2}
            mt={3}
        >
        <TextField
            {...register("userName")}
            label="User Name"
            fullWidth
            error={!!errors.userName}
            helperText={errors.userName?.message}
        />

        <TextField
            {...register("fullName")}
            label="Full Name"
            fullWidth
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
        />

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

        <TextField
            {...register("phoneNumber")}
            label="Phone Number"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
        />

        <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            disabled={isSubmitting}
        >
            {isSubmitting ? <CircularProgress size={24} /> : "Register"}
        </Button>
        </Box>
    </Paper>
    </Container>
);
}
