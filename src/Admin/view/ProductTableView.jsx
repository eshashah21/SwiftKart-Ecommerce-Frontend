import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Card,
  CardHeader,
} from "@mui/material";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";

const ProductTableView = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((store) => store);
    
    useEffect(() => {
      const data = {
        category: "",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 10000,
        minDiscount: 0,
        sort: "price_low",
        pageNumber: 0,
        pageSize: 50,
        stock: "",
      };
  
      dispatch(findProducts(data));
    }, [dispatch, products.deletedProduct]);

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="Recent Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
              </TableRow>
            </TableHead>
            {products && products.products && products.products.content && (
              <TableBody>
                {products?.products?.content?.slice(0, 15).map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <Avatar src={item.imageUrl}></Avatar>
                    </TableCell>
                    {/* <TableCell component="th" scope="row"> {item.title}</TableCell> */}
                    <TableCell align="left" scope="row">
                      {" "}
                      {item.title}
                    </TableCell>
                    <TableCell align="left">{item.category.name}</TableCell>
                    <TableCell align="left">{item.price}</TableCell>
                    <TableCell align="left">{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default ProductTableView
