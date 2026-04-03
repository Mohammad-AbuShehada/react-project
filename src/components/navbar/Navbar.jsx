import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Link as RouterLink} from 'react-router-dom';
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { Badge } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18netx";
export default function Navbar() {
    const token = useAuthStore( (state) => state.token);
    const logout= useAuthStore( (state) => state.logout);
    const {t}=useTranslation();
    const changeLanguage=()=>{
        const newLanguage =i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(newLanguage);
    }
    const {data}=useCart();
    const cartCount=data?.items?.length||0;
    const navigate = useNavigate();
    const handleLogout=()=>{
        logout();
        navigate('/login');
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ backgroundColor: "white", color: "black" }}>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
                        <img src="../../../public/Logo.svg" alt="logo" style={{ width: 28, marginRight: 8 }}/>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>MOON.</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: "flex", gap: 3, alignItems:"center"}}>
                        <button onClick={changeLanguage} color="inherit">
                            {i18n.language === "ar" ? "EN" : "AR"}
                        </button> 
                        <Link component={RouterLink} to={'/'} color="inherit" sx={{ textTransform: "none"}} underline="none">{t("Home")}</Link>
                        {
                            token?
                        (
                            <>
                            <Badge badgeContent={cartCount} color="secondary">
                                <Link component={RouterLink} to={'/cart'} color="inherit" sx={{ textTransform: "none" }} underline="none">{t("Cart")}</Link>
                            </Badge>
                            <Link component={'button'} onClick={handleLogout} color="inherit" sx={{ textTransform: "none" }} underline="none">{t("Logout")}</Link>
                            </>
                        ):
                        (
                            <>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
                                <Link component={RouterLink} to={'/login'} color="inherit" sx={{ textTransform: "none" }} underline="none">{t("Login")}</Link>
                                <Link component={RouterLink} to={'/register'} variant="outlined" sx={{ textTransform: "none",borderColor: "black",color: "black"}} underline="none">{t("Register")}</Link>
                            </Box>
                            </>
                        )
                        }
                        <Link component={RouterLink} to={'/shop'} color="inherit" sx={{ textTransform: "none" }} underline="none">{t("Products")}</Link>
                        <Link component={RouterLink} to={'/about'} color="inherit" sx={{ textTransform: "none" }} underline="none">{t("About")}</Link>
                        <Link component={RouterLink} to={'/contact'} color="inherit" sx={{ textTransform: "none" }} underline="none">{t("Contact")}</Link>
                    </Box>
                    <Box>
                        <IconButton color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to={token?'/profile':'/login'}>
                            <PersonOutlineIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton color="inherit">
                            <ShoppingCartOutlinedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
