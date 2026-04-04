import { createTheme } from "@mui/material";
const getTheme=(mode)=>{
    return createTheme({
    palette:{
        primary:{
            main:"#ff0000",
            dark:"#fff000"
        }
    },
    typography:{
        h2:{
            fontFamily:"cursive",
            fontSize:"2rem",
            fontWeight:"900",
        }
        
    },
    spacing:8,
    mode:mode,
});
}

export default getTheme;