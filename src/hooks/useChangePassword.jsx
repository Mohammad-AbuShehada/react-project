import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxioInstance";
import i18n from "../../i18netx";

export default function useChangePassword() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values) => {
            const response = await authAxiosInstance.patch("/Profile/change-password", {
                CurrentPassword: values.currentPassword,
                NewPassword: values.newPassword,
                ConfirmNewPassword: values.confirmNewPassword,
            });

            if (response.data?.success === false) {
                throw new Error(response.data?.message || "Password update failed");
            }

            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profile", i18n.language] });
        },
    });
}
