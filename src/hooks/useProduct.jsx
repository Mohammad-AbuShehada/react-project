import React from "react"
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import i18n from "../../i18netx";
export default function useProduct(id) {

        const getProduct=async()=>{
        const response=await axiosInstance.get(`/Products/${id}`);
        return response.data;
    }
        const query= useQuery({
            queryKey:['product',i18n.language,id],
            queryFn:getProduct,
            staleTime:1000*60*5,
            enabled:Boolean(id)
        });

    return  query;
}