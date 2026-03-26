import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import useCategories from "../../hooks/uesCategories";
import Loader from "../../ui/Loader/Loader";
export default function Categories() {

        const {data,isLoading,isError,error}=useCategories();
        if(isLoading) return <Loader />
        if(isError) return <Box color={'red'}>{error.message}</Box>

    return (
        <Box className="categories" py={3}>
            <Typography component={'h2'} variant={'h4'}>Categories</Typography>

            <Grid container>
                <Grid item></Grid>
                <Grid item></Grid>
            </Grid>

            {data.response.data.map(category=><Box>{category.name}</Box>)}
        </Box>
    )
}