import { createTheme } from "@mui/material";

const theme=createTheme({
    palette:{
        primary:{
            main:"#ff0000"
        }
    },
    typography:{
        h2:{
            fontFamily:"cursive",
            fontSize:"2rem",
            fontWeight:"900",
        },
        
    },
    spacing:8,
});
export default theme;