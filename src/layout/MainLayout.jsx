import React from "react"
import Navpar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom"
import { Container,Box} from "@mui/material"

export default function MainLayout() {
    return (
        <Box
        sx={{
            minHeight:"100vh",
            display:"flex",
            flexDirection:"column",
            bgcolor:"background.default",
        }}
        >
        <Navpar />
        <Box component="main" sx={{flex:1}}>
            <Outlet />
        </Box>
        <Footer />
        </Box>
    )
}