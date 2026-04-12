import React from "react"
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import i18n from "../../i18netx";

export default function useProducts(options = {}) {
    const {limit,search,categoryId,minPrice,maxPrice,sort,} = options;

        const getProducts=async()=>{
        const params = new URLSearchParams();
        if(limit) params.set("limit", limit);
        if(search) params.set("search", search);
        if(categoryId) params.set("categoryId", categoryId);
        if(minPrice !== "" && minPrice !== undefined && minPrice !== null) params.set("minPrice", minPrice);
        if(maxPrice !== "" && maxPrice !== undefined && maxPrice !== null) params.set("maxPrice", maxPrice);
        if(sort) params.set("sort", sort);
        const queryString = params.toString();
        const suffix=queryString ? `?${queryString}` : "";
        const response=await axiosInstance.get(`/Products${suffix}`);
        return response.data;
    }
        const query= useQuery({
            queryKey:['products',i18n.language,limit,search,categoryId,minPrice,maxPrice,sort],
            queryFn:getProducts,
            staleTime:1000*60*5
        });

    return  query;
}
