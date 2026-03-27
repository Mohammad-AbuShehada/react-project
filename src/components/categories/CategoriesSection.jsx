import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import useCategories from "../../hooks/uesCategories";
import Loader from "../../ui/Loader/Loader";
import { Link } from "react-router-dom";
import Category from "../../ui/category/Category";
export default function CategoriesSection() {

        const {data,isLoading,isError,error}=useCategories();
        if(isLoading) return <Loader />
        if(isError) return <Box color={'red'}>{error.message}</Box>

    return (
        <Box className="categories" py={3}>
            <Typography component={'h2'} variant='h4' mb={2}>Categories</Typography>
            <Link to='/categories'>Show more</Link>
            <Grid container spacing={6}>
                {data.response.data.map(category=>
                <Grid item size={{cs:12,sm:6,md:4,lg:3}}>
                    <Category category={category} />
                </Grid>
                )}
            </Grid>
        </Box>
    )
}