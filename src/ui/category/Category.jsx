import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function Category({category}) {
    return (
        <Card sx={{py:3,textAlign:'center'}}>
            <CardContent>
                <Typography fontWeight={'600'} component={'h3'}>
                    {category.name}
                </Typography>
            </CardContent>
        </Card>
    )
}