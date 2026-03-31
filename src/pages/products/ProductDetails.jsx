import React from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import Loader from "../../ui/Loader/Loader";
import { Button, CardMedia, Rating, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import useAddToCart from "../../hooks/useAddToCart";

export default function ProductDetails() {

    const {id} =useParams();
    const {data,isLoading,isError,error}=useProduct(id);
    const {mutate,isPending}=useAddToCart();
    if(isLoading) return <Loader />
    if(isError) return <Box color={'red'}>{error.message}</Box>
    const product = data.response;

    return (
        <Box component={'div'} className='product_detalis' py={4}>
            <Card sx={{display:'flex', padding:'30px'}}>
                <CardMedia component={'img'} image={product.image}
                sx={{width:{xs:'100%',md:300,flex:'wrap',gap:7}}}
                ></CardMedia>
                <Box sx={{flex:1}}>
                    <Typography component={'h1'} variant="h3" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography component={'span'} variant="body1" sx={{display:'block'}} gutterBottom>
                        {product.price} $
                    </Typography>
                    <Rating readOnly value={product.rate} gutterBottom></Rating>
                    <Typography>
                        {product.description}
                    </Typography>
                    <Typography color="text.secondary">
                        available count :{product.quantity}
                    </Typography>

                    <Button disabled={isPending} color="primary" variant="contained" onClick={()=>mutate({
                        ProductId: product.id,
                        Count: 1
                    })}>Add To Cart</Button>
                    
                </Box>
            </Card>
        </Box>
            
    )
}