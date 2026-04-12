import { useQuery } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxioInstance';
import i18n from '../../i18netx';
export default function useProfile() {
    return useQuery({
        queryKey: ['profile', i18n.language],
        queryFn: async()=>{
            const response=await authAxiosInstance.get('/Profile');
            return response.data;
        },
        staleTime:1000*60*50
})
}
