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

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ backgroundColor: "white", color: "black" }}>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
                        <img src="../../../public/Logo.svg" alt="logo" style={{ width: 28, marginRight: 8 }}/>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>MOON.</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: "flex", gap: 3, alignItems:"center"}}>
                        <Link component={RouterLink} to={'/'} color="inherit" sx={{ textTransform: "none"}} underline="none">Home</Link>
                        <Link component={RouterLink} to={'/shop'} color="inherit" sx={{ textTransform: "none" }} underline="none">Shop</Link>
                        <Link component={RouterLink} to={'/about'} color="inherit" sx={{ textTransform: "none" }} underline="none">About</Link>
                        <Link component={RouterLink} to={'/contact'} color="inherit" sx={{ textTransform: "none" }} underline="none">Contact</Link>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
                        <Link component={RouterLink} to={'/login'} color="inherit" sx={{ textTransform: "none" }} underline="none">Login</Link>
                        <Link component={RouterLink} to={'/register'} variant="outlined" sx={{ textTransform: "none",borderColor: "black",color: "black"}} underline="none">Register</Link>
                    </Box>
                    <Box>
                        <IconButton color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <IconButton color="inherit">
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
