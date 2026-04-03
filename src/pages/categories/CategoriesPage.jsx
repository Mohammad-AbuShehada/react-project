import React from "react";
import {Box} from "@mui/material";
import useCategories from "../../hooks/uesCategories";
import Loader from "../../ui/Loader/Loader";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Category from "../../ui/category/Category";
import { useTranslation } from "react-i18next";
export default function CategoriesPage() {
        const {t}=useTranslation();
        const {data,isLoading,isError,error}=useCategories(7);
            if(isLoading) return <Loader />
            if(isError) return <Box color={'red'}>{error.message}</Box>

    return (
        <Box className="categories" py={3}>
            <Typography component={'h2'} variant='h4' mb={2}>{t("Categories")}</Typography>
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