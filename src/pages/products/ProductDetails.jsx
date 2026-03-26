import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import Loader from "../../ui/Loader/Loader";
export default function ProductDetails() {

    const {id} =useParams();
    const {data,isLoading,isError,error}=useProduct(id);
    if(isLoading) return <Loader />
    if(isError) return <Box color={'red'}>{error.message}</Box>
    console.log(data);
    return (
        <div>
            ProductDetails
        </div>
    )
}