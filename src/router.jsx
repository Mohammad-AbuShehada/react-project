import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/login/Login";
import ProductDetails from "./pages/products/ProductDetails";
import Register from "./pages/auth/register/Register";
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
            path:'/cart',
            element:<Cart />
        },
        {
            path:'/product/:id',
            element:<ProductDetails />
        },
        {
            path:'/login',
            element:<Login />
        },
        {
            path:'/register',
            element:<Register />
        }
    ]
    }
]);
export default router;