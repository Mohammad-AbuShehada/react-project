import React from "react"
import useCart from "../../hooks/useCart"

export default function Cart() {
    const  {data,isLoading,error}=useCart();
    console.log("cart",data,isLoading,error);
    return (
        <div>
            Cart
        </div>
    )
}