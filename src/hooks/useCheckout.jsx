import { useMutation } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxioInstance'
import { useQueryClient } from '@tanstack/react-query'
export default function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn:async(formValues)=>{
        const response = await authAxiosInstance.post('/Checkouts',{
          PaymentMethod: formValues.paymentMethod,
        });

        if (response.data?.success === false) {
          throw new Error(response.data?.message || "Checkout request failed");
        }

        return response;
      },
      onSuccess:(response)=>{
        if(response.data.url){
          location.href=response.data.url;
        }
          queryClient.invalidateQueries({ queryKey:['carts'] });
      },
  });
}
