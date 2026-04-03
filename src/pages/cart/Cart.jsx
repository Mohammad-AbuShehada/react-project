import React from "react"
import useCart from "../../hooks/useCart"
import { Button, IconButton, TableCell, TableContainer, TableFooter, TableRow, Typography ,TableBody} from "@mui/material";
import { Box } from "@mui/material";
import Loader from "../../ui/Loader/Loader";
import { Table , TableHead} from "@mui/material";
import useRemoveFromCart from "../../hooks/useRemoveFromCart";
import useUpdateCartItem from "../../hooks/useUpdateCatrItem";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
export default function Cart() {
const nevigate = useNavigate();
    const  {data,isError,error,isLoading}=useCart(); 
    const {mutate:removeItem,isPending}=useRemoveFromCart();
    const {mutate:updateItem,isPending:isPendingUpdate}=useUpdateCartItem();
    const handleUpdateQty=(productId,action)=>{
        const item=data.items.find((i)=>{
            return i.productId==productId;
        })
        if(action=='-')
            updateItem({productId,count:item.count-1});
        else
            updateItem({productId,count:item.count+1});
    };
    if(isLoading) return <Loader />
    if(isError) return <Box color={'red'}>{error.message}</Box>
    console.log(data);
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
                                    {item.productName}
                                </TableCell>
                                <TableCell>
                                    {item.price}$
                                </TableCell>
                                <TableCell>
                                    <Box sx={{display:'flex',alignItems:'center'}}>
                                        <IconButton size="small" disabled={isPendingUpdate} onClick={()=>handleUpdateQty(item.productId,'-')}>
                                            <RemoveIcon/>
                                        </IconButton>
                                        <Typography>
                                            {item.count}
                                        </Typography>
                                        <IconButton size="small" disabled={isPendingUpdate} onClick={()=>handleUpdateQty(item.productId,'+')}>
                                            <AddIcon/>
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {item.count * item.price}$
                                </TableCell>
                                <TableCell>
                                    <Button disabled={isPending} color='error' variant='contained' onClick={()=>removeItem(item.productId)}>Remove</Button>
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
            <Box sx={{display:'flex',gap:3}}>
                    <Button variant='contained' color='success' sx={{flex:1}}
                    onClick={()=>nevigate('/checkout')}
                    >Procces To Checkout</Button>
                    <Button variant='contained' color='primary' sx={{flex:1}}
                    onClick={()=>nevigate('/')}
                    >Countinue Shopping</Button>
            </Box>
        </Box>
    )
}