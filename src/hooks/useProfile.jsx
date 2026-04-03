import { useQuery } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxioInstance';

export default function useProfile() {
    return useQuery({
        queryKey: ['profile','en'],
        queryFn: async()=>{
            const response=await authAxiosInstance.get('/Profile');
            return response.data;
        },
        staleTime:1000*60*50
})
}
