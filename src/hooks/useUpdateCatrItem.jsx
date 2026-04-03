import { useMutation } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateCartItem() {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:async({productId,count})=>{
            return await authAxiosInstance.patch(`/Carts/${productId}`,{count})
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(
                { queryKey:['carts', 'en'] }
            )
        }
    })
}