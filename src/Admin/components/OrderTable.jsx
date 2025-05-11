import React, { useEffect } from "react";
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

const OrderTable = () => {
  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

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

  console.log("admin orders: ", adminOrder);

  const handleShipOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleConfirmOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };

  const handleDeliverOrder = (orderId) => {
    dispatch(deliverOrder(orderId));
    handleClose();
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const deletedOrder = await deleteOrder(orderId);
      console.log("Order deleted successfully:", deletedOrder);
      dispatch(deleteOrder(orderId));
      handleClose();
    } catch (error) {
      console.error("Error deleting order:", error.message);
    }
  };

  return (
    <div>
      <Card className="mt-2">
        <CardHeader title="All Orders" />
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
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item, index) =>
                item.orderItems.map((orderItem) => (
                  <TableRow
                    key={orderItem._id} // Use a unique identifier for the key
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <AvatarGroup>
                        {item.orderItems.map((orderItem) => (
                          <Avatar src={orderItem?.product?.imageUrl}></Avatar>
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="left" scope="row">
                      {item.orderItems.map((orderItem) => (
                        <p>{orderItem?.product?.title}</p>
                      ))}
                    </TableCell>
                    <TableCell align="left">{orderItem._id}</TableCell>
                    <TableCell align="left">{orderItem.price}</TableCell>{" "}
                    <TableCell align="left">{orderItem.discountedPrice}</TableCell>{" "}
                    {/* Displaying the price of the order item */}
                    <TableCell align="left">
                      {orderItem.quantity}
                    </TableCell>{" "}
                    {/* Displaying the quantity of the order item */}
                    <TableCell align="left">
                      <Button
                        id="basic-button"
                        // aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        // aria-expanded={open ? "true" : undefined}
                        onClick={(event) => handleClick(event, index)}
                        aria-controls={`basic-menu-${item._id}`}
                        aria-expanded={Boolean(anchorEl[index])}
                      >
                        Status
                      </Button>
                      <Menu
                        id={`basic-menu-${item._id}`}
                        anchorEl={anchorEl[index]}
                        open={Boolean(anchorEl[index])}
                        onClose={() => handleClose(index)}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => handleConfirmOrder(item._id)}>
                          Confirmed Order
                        </MenuItem>
                        <MenuItem onClick={() => handleShipOrder(item._id)}>
                          Shipped Order
                        </MenuItem>
                        <MenuItem onClick={() => handleDeliverOrder(item._id)}>
                          Delivered Order
                        </MenuItem>
                      </Menu>
                    </TableCell>
                    <TableCell align="left">
                      {" "}
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
                        {" "}
                        {item.orderStatus}{" "}
                      </span>{" "}
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleDeleteOrder(item._id)}
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;