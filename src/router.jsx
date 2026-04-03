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
const router=createBrowserRouter([
    {
    path:"/",
    element:<MainLayout />,
        children:[
        {
            index:true,
            element:<Home />
        },
        {
            path:'cart',
            element:
            <ProtectedRouter>
                <Cart />
            </ProtectedRouter>
        },
        {
            path:'checkout',
            element:
            <ProtectedRouter>
                <Checkout />
            </ProtectedRouter>
        },
        {
            path:'profile',
            element:
            <ProtectedRouter>
                <Profile />
            </ProtectedRouter>,
            children:[
                {
                    index:true,
                    element:<ProfileInfo />
                },
                {
                    path:'orders',
                    element:<ProfileOrders />
                }
            ]
        },
        {
            path:'product/:id',
            element:<ProductDetails />
        },
        {
            path:'categories',
            element:<CategoriesPages />
        },
        {
            path:'login',
            element:<Login />
        },
        {
            path:'register',
            element:<Register />
        }
    ]
    }
]);
export default router;