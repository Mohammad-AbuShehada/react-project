import {Box, CircularProgress} from "@mui/material";
import useCategories from "../../hook/uesCategories";
export default function Categories() {

        const {data,isLoading,isError,error}=useCategories();
        if(isLoading) return <CircularProgress />
        if(isError) return <Box color={'red'}>{error.message}</Box>

    return (
        <Box>
            {data.response.map(category=><Box>{category.name}</Box>)}
        </Box>
    )
}