import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";
export default function ProtectedRouter({children}){

    const token = useAuthStore( (state) => state.token);
    const location = useLocation();
    if(!token){
        return <Navigate to='/login' state={{ from: location.pathname }} replace />
    }

    return children;
}
