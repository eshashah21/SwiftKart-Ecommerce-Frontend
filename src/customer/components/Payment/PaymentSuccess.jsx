import { Alert, AlertTitle, Grid, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderTracker from "../Order/OrderTracker";
import AddressCard from "../AddressCard/AddressCard";
import { updatePayment } from "../../../State/Payment/Action";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store);

    // Extract payment details from URL
    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);
        setPaymentId(urlParam.get("razorpay_payment_id"));
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
    }, []);

    // Fetch order and update payment
    useEffect(() => {
        if (paymentId) {
            const data = { orderId, paymentId };
            dispatch(getOrderById(orderId));
            dispatch(updatePayment(data));
        }
    }, [orderId, paymentId, dispatch]);

    return (
        <Box className="px-2 lg:px-36 py-10">
            {/* Centered Payment Success Message */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    mb: 6,
                }}
            >
                <Alert
                    variant="filled"
                    severity="success"
                    sx={{ mb: 2, width: "fit-content" }}
                >
                    <AlertTitle>Payment Success</AlertTitle>
                    Congratulations! Your order got placed.
                </Alert>
                <OrderTracker activeStep={1} />
            </Box>

            {/* Order Items and Address */}
            {order.order && (
                <Box>
                    <Grid container spacing={3} sx={{ mb: 5 }}>
                        {order.order.orderItems.map((item, index) => (
                            <Grid
                                key={index}
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    borderBottom: "1px solid #e0e0e0",
                                    pb: 2,
                                    mb: 3,
                                }}
                            >
                                <img
                                    className="w-[5rem] h-[5rem] object-cover object-top"
                                    src={item.product.imageUrl}
                                    alt={item.product.title}
                                />
                                <Box sx={{ ml: 3, flexGrow: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item.product.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "gray", fontSize: "0.875rem" }}
                                    >
                                        Size: {item.size}
                                    </Typography>
                                </Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Rs {item.price}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Shipping Address */}
                    <Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                            Shipping Address
                        </Typography>
                        <AddressCard address={order.order.shippingAddress} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default PaymentSuccess;
