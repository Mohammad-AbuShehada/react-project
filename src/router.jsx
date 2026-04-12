import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/login/Login";
import ProductDetails from "./pages/products/ProductDetails";
import Register from "./pages/auth/register/Register";
import CategoriesPages from "./pages/categories/CategoriesPage";
import ProtectedRouter from "./ProtectedRouter";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import ProfileInfo from "./pages/profile/ProfileInfo";
import ProfileOrders from "./pages/profile/ProfileOrders";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import Contact from "./pages/contact/Contact";
import Blog from "./pages/blog/Blog";
import About from "./pages/about/About";
import Wishlist from "./pages/wishlist/Wishlist";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'cart',
                element:
                    <ProtectedRouter>
                        <Cart />
                    </ProtectedRouter>
            },
            {
                path: 'checkout',
                element:
                    <ProtectedRouter>
                        <Checkout />
                    </ProtectedRouter>
            },
            {
                path: 'profile',
                element:
                    <ProtectedRouter>
                        <Profile />
                    </ProtectedRouter>,
                children: [
                    {
                        index: true,
                        element: <ProfileInfo />
                    },
                    {
                        path: 'orders',
                        element: <ProfileOrders />
                    }
                ]
            },
            {
                path: 'product/:id',
                element: <ProductDetails />
            },
            {
                path: 'categories',
                element: <CategoriesPages />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'blog',
                element: <Blog />
            },
            {
                path: 'wishlist',
                element: <Wishlist />
            }
        ]
    }
]);
export default router;
