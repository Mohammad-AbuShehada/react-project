import { set } from "react-hook-form";
import { create } from "zustand";

const useAuthStore= create( ()=>({
    token:localStorage.getItem("accessToken"),
    setToken:(newToken)=>{
        set({
            token:newToken
        });
        localStorage.setItem("accessToken",newToken);
    },
    logout:()=>{
        set({
            token:null
        });
        localStorage.removeItem("accessToken");
    }
}));

export default useAuthStore;