import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";
export default function useRemoveFromCart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cartItemId)=> authAxiosInstance.delete(`/Carts/${cartItemId}`),
        onSuccess:()=>{
                    queryClient.invalidateQueries(
                        { queryKey:['carts']}
                    )
                }
    })
}