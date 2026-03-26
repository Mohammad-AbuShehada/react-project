import React from "react"
import auhtAxioInstance from "../api/authAxioInstance"
import { useQuery } from "@tanstack/react-query";
export default function useCart() {
    const getItems=async()=>{
        const response=await auhtAxioInstance.get(`/Carts`);
        return response.data;
    }

    const query= useQuery({
            queryKey:['cart','en'],
            queryFn:getItems,
            staleTime:1000*60*5
        });
    return query;
}