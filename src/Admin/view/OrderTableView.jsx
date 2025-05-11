import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/Action";
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
  AvatarGroup,
  Menu,
  MenuItem,
} from "@mui/material";

const OrderTableView = () => {

    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);
    
    const dispatch = useDispatch();
    const { adminOrder } = useSelector((store) => store);
  
    useEffect(() => {
      dispatch(getOrders());
    }, [
      dispatch,
      adminOrder.confirmed,
      adminOrder.shipped,
      adminOrder.delivered,
      adminOrder.deletedOrder,
    ]);

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Discounted Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item) =>
                item.orderItems.map((orderItem) => {
                  const product = orderItem.product;

                  const imageUrl = product?.imageUrl;
                  const title = product?.title;

                  return (
                    <TableRow
                      key={orderItem._id} // Use a unique identifier for the key
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <AvatarGroup>
                          {item.orderItems.map((orderItem) => {
                            const productImageUrl = orderItem.product?.imageUrl;
                            return productImageUrl ? (
                              <Avatar key={orderItem._id} src={productImageUrl} />
                            ) : (
                              <Avatar key={orderItem._id}>No Image</Avatar>
                            );
                          })}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell align="left" scope="row">
                        {item.orderItems.map((orderItem) => (
                          <p key={orderItem._id}>{orderItem.product?.title || "No Title"}</p>
                        ))}
                      </TableCell>
                      <TableCell align="left">{orderItem._id}</TableCell>
                      <TableCell align="left">{orderItem.price}</TableCell>
                      <TableCell align="left">{orderItem.discountedPrice}</TableCell>
                      <TableCell align="left">{orderItem.quantity}</TableCell>
                      <TableCell align="left">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-sm font-medium ${
                            item.orderStatus === "CONFIRMED"
                              ? "bg-green-500"
                              : item.orderStatus === "SHIPPED"
                              ? "bg-blue-500"
                              : item.orderStatus === "DELIVERED"
                              ? "bg-red-500"
                              : item.orderStatus === "PENDING"
                              ? "bg-gray-500"
                              : item.orderStatus === "PLACED"
                              ? "bg-gray-500"
                              : ""
                          }`}
                        >
                          {item.orderStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTableView;
