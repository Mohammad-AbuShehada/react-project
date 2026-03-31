import { useMutation } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";
import { useQueryClient } from "@tanstack/react-query";
export default function useAddToCart() {
    const queryClient=useQueryClient();
        const mutation =useMutation({
                mutationFn:async(ProductId,Count)=>{
                    return await authAxiosInstance.post('/Carts',{
                            ProductId:ProductId,
                            Count:Count
                        });
                },onSuccess:()=>{
                    queryClient.invalidateQueries(
                        { queryKey:['carts']}
                    )
                }
        })
    return mutation;
}