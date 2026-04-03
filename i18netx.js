import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
i18n
.use(detector)
.use(initReactI18next).init({
resources: {
    en: {
        translation: {
        "Home": "Home",
        "Products": "Products",
        "Cart": "Cart",
        "Categories": "Categories",
        "Login": "Login",
        "Register": "Register",
        "Logout": "Logout",
        "About": "About",
        "Contact": "Contact"
        }
    },
    ar:{
        translation: {
        "Home": "الرئيسية",
        "Products": "المنتجات",
        "Cart": "السلة",
        "Categories": "التصنيفات",
        "Login": "تسجيل الدخول",
        "Register": "انشاء حساب",
        "Logout": "تسجيل الخروج",
        "About": "من نحن",
        "Contact": "اتصل بنا"
        }
    }
    },
    fallbackLng: "en",
});
export default i18n;