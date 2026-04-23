import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";
import i18n from "../../i18netx";

export default function useChangeEmail() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values) => {
            const response = await authAxiosInstance.patch("/Profile/change-email", {
                NewEmail: values.newEmail,
            });

            if (response.data?.success === false) {
                throw new Error(response.data?.message || "Email update failed");
            }

            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profile", i18n.language] });
        },
    });
}
