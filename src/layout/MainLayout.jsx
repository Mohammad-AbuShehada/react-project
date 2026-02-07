import React from "react"
import Navpar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from "react-router-dom"
export default function MainLayout() {
    return (
        <>
        <Navpar />
        <Outlet />
        <Footer />
        </>
    )
}