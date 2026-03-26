import React from "react";
import useProducts from "../../hooks/useProducts";
import {Box,Card,CardMedia,CardContent, Typography,Grid} from "@mui/material";
import Loader from "../../ui/Loader/Loader";
import { Link } from "react-router-dom";
export default function Products() {
        const {data,isLoading,isError,error}=useProducts();
        if(isLoading) return <Loader />
        if(isError) return <Box color={'red'}>{error.message}</Box>
    return (
            <Box className="products" py={3}>
                {data.response.data.map(product=>
                    <Grid item size={{xs:12,sm:6,md:4,lg:3}}>
                        <Link to={`/product/${product.id}`}>
                            <Card sx={{py:3,textAlign:'center'}}>
                                <CardMedia 
                                component={'img'}
                                image={product.image}
                                ></CardMedia>
                                <CardContent>
                                    <Typography component={'h3'}>{product.name}</Typography>
                                    <Typography component={'span'} variant='body1'>{product.price}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                
                )}
            </Box>
    )
}