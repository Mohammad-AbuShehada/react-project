import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";
import i18n from "../../i18netx";

export default function useAddReview(productId) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ rating, comment }) => {
            const response = await authAxiosInstance.post(`/Products/${productId}/reviews`, {
                Rating: rating,
                Comment: comment,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["product", i18n.language, String(productId)],
            });
            queryClient.invalidateQueries({
                queryKey: ["product", i18n.language, productId],
            });
        },
    });
}
