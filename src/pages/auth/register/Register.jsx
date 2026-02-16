import React from "react"
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../../validation/RegisterSchema"
export default function Register() {
        const {register, handleSubmit,formState:{errors}} = useForm({
                resolver: yupResolver(registerSchema)
        });
        
        const registerForm = async (values) => {
            try{
                const response =await axios.post(`https://knowledgeshop.runasp.net/api/auth/Account/Register`, values);
                console.log("response", response);
            }catch(error){
                console.log("catch error", error);
            }
        }

    return (
        <Box component={'section'} className='register-form'>
            <Typography component={'h1'} variant='h1'>
                Register
            </Typography>
            <Box component={'form'} 
                onSubmit={handleSubmit(registerForm)}
            display={'flex'} flexDirection={'column'} gap={2} mt={3} alignItems={'center'}>
                <TextField  {...register('userName')} fullWidth label="User Name" variant="outlined" 
                error={errors.userName}
                helperText={errors.userName?.message}
                />
                <TextField  {...register('fullName')} fullWidth label="Full Name" variant="outlined" 
                error={errors.fullName}
                helperText={errors.fullName?.message}
                />
                <TextField  {...register('email')} fullWidth label="Email" variant="outlined" 
                error={errors.email}
                helperText={errors.email?.message}
                />
                <TextField  {...register('password')} fullWidth label="Password" variant="outlined" 
                error={errors.password}
                helperText={errors.password?.message}
                />
                <TextField  {...register('phoneNumber')} fullWidth label="Phone Number" variant="outlined" 
                error={errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                />
                <Button variant="contained" type="submit">Register</Button>
            </Box>
        </Box>
    )
}