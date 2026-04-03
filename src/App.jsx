import React, { Component, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { QueryClient ,QueryClientProvider} from "@tanstack/react-query"
import "../i18netx"
import { useTranslation } from "react-i18next"
import { ThemeProvider } from "@emotion/react"
import theme from "./theme"
import { CssBaseline } from "@mui/material"
export default function App() {    


  const {i18n}=useTranslation();
  useEffect(()=>{
    const dir=i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir=dir;
  },[i18n.language])
  const queryClient=new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
  
      </QueryClientProvider>
  )
}
