import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";

export default function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ ProductId, Count }) => {
        const response = await authAxiosInstance.post("/Carts", {
        ProductId,
        Count,
        });
        return response.data;
    },
    onSuccess: () => {
            queryClient.invalidateQueries({
            queryKey: ["carts"],
        });
    },
    });
}