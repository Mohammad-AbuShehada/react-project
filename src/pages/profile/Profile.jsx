import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import useProfile from '../../hooks/useProfile'

export default function Profile() {

    const {data}=useProfile();
    console.log(data);
    return (
        <Box className="profile">
            <Typography variant='h2' component="h1">
                My Profile
            </Typography>
            <Link to=''>
                Info
            </Link>
            <Link to='orders'>
                Order
            </Link>

            <Box>
                <Outlet /> 
            </Box>
        </Box>
    )
}
