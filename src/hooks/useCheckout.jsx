import { useMutation } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxioInstance'
import { useQueryClient } from '@tanstack/react-query'
export default function useCheckout() {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn:async(paymentMethod)=>{
        return await authAxiosInstance.post('/Checkouts',{PaymentMethod:paymentMethod})
      },onSuccess:(response)=>{
          if(response.data.url)
            location.href=response.data.url;
          queryClient.invalidateQueries(
              { queryKey:['carts'] }
          )
      }
  })
}
