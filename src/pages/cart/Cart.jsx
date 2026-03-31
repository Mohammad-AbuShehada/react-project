import React from "react"
import useCart from "../../hooks/useCart"
import { Button, TableCell, TableContainer, TableFooter, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/material";
import Loader from "../../ui/Loader/Loader";
import { Table , TableHead,TableBody} from "@mui/material";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
export default function Cart() {
    const  {data,isError,error,isLoading}=useCart();
    const {mutate,isPending}=useRemoveFromCart();
    if(isLoading) return <Loader />
    if(isError) return <Box color={'red'}>{error.message}</Box>
    return (
        <Box className="cart" sx={{py:5}}>
            <Typography component={'h1'}>
                My Cart
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Product Name
                            </TableCell>
                            <TableCell>
                                Price
                            </TableCell>
                            <TableCell>
                                Quantity
                            </TableCell>
                            <TableCell>
                                Total
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map(item=>(
                            <TableRow>
                                <TableCell>
                                    {item.productNmae}
                                </TableCell>
                                <TableCell>
                                    {item.price}$
                                </TableCell>
                                <TableCell>
                                    {item.count}
                                </TableCell>
                                <TableCell>
                                    {item.count * item.price}$
                                </TableCell>
                                <TableCell>
                                    <Button disabled={isPending} color='error' variant='contained' onClick={()=>mutate(item.productId)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={5} sx={{fontWeight:800}}>
                            Total : {data.cartTotal}$
                        </TableCell>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    )
}