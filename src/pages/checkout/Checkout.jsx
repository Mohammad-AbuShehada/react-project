import React from "react";
import useCart from "../../hooks/useCart";
import Loader from "../../ui/Loader/Loader";
import { Box, Button, FormControl, FormLabel, InputLabel, Select } from "@mui/material";
import { Table , TableHead,TableContainer,TableRow,TableCell,TableBody,TableFooter} from "@mui/material";
import { Typography } from "@mui/material";
import useCheckout from "../../hooks/useCheckout";
import { MenuItem } from "@mui/material";

export default function Checkout(){
    const {data,isError,error,isLoading}=useCart();
    const [paymentMethod,setPaymentMethod]=React.useState('cash');
    const {mutate:checkout}=useCheckout();
    if(isLoading) return <Loader />
    if(isError) return <Box color={'red'}>{error.message}</Box>
    return (
        <Box className="cart" sx={{py:5}}>
            <Typography component={'h1'}>
                Checkout
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.items.map(item=>(
                            <TableRow>
                                <TableCell>
                                    {item.productName}
                                </TableCell>
                                <TableCell>
                                    {item.price}$
                                </TableCell>
                                <TableCell>
                                        <Typography>
                                            {item.count}
                                        </Typography>
                                </TableCell>
                                <TableCell>
                                    {item.count * item.price}$
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5} sx={{fontWeight:800}}>
                                Total : {data.cartTotal}$
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Box sx={{display:'flex',flexDirection:'column',gap:3,mt:5}}>
                <FormControl fullWidth>
                    <InputLabel id="paymentMethod">Payment Method</InputLabel>
                    <Select
                        labelId="paymentMethod"
                        id="paymentMethod"
                        value={paymentMethod}
                        label="paymentMethod"
                        onChange={(e)=>setPaymentMethod(e.target.value)}>
                        <MenuItem value={'Cash'}>Cash</MenuItem>
                        <MenuItem value={'Visa'}>Visa</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={()=>checkout(paymentMethod)}>
                    Pay Now
                </Button>
            </Box>
        </Box>
    )
}