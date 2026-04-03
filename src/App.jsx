import React, { Component, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { QueryClient ,QueryClientProvider} from "@tanstack/react-query"
import "../i18netx"
import { useTranslation } from "react-i18next"
export default function App() {    


  const {i18n}=useTranslation();
  useEffect(()=>{
    const dir=i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir=dir;
  },[i18n.language])
  const queryClient=new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  )
}
