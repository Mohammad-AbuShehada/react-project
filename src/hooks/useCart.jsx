import React from "react"
import auhtAxioInstance from "../api/authAxioInstance"
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../store/useAuthStore";
export default function useCart() {
    const token=useAuthStore(state=>state.token);
    const getItems=async()=>{
        const response=await auhtAxioInstance.get(`/Carts`);
        return response.data;
    }

    const query= useQuery({
            queryKey:['carts'],
            queryFn:getItems,
            staleTime:1000*60*5,
            enabled:Boolean(token)
        });
    return query;
}