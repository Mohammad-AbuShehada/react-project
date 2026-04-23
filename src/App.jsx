import React, { useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "../i18netx"
import { useTranslation } from "react-i18next"
import { ThemeProvider } from "@emotion/react"
import getTheme from "./theme"
import { CssBaseline } from "@mui/material"
import useThemeStore from "./store/useThemeStore"
import useAuthStore from "./store/useAuthStore"
import useWishlistStore from "./store/useWishlistStore"
export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction])
  const mode = useThemeStore((state) => state.mode);
  const token = useAuthStore((state) => state.token);
  const syncItemsWithAuth = useWishlistStore((state) => state.syncItemsWithAuth);

  useEffect(() => {
    syncItemsWithAuth();
  }, [token, syncItemsWithAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={getTheme(mode, direction)}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>

    </QueryClientProvider>
  )
}
