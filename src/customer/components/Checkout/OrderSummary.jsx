import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../Cart/CartItem";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../../State/Payment/Action";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order } = useSelector((store) => store);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  const GST_RATE = 0.18; // 18% GST
  const totalPrice = order.order?.totalPrice || 0;
  const discount = order.order?.discount || 0;
  const discountedPrice = totalPrice - discount;
  const gstAmount = discountedPrice * GST_RATE;
  const deliveryCharge = discountedPrice < 700 ? 40 : 0;
  const totalAmount = discountedPrice + gstAmount + deliveryCharge;

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard address={order.order?.shippingAddress} />
      </div>

      <div className="p-5 lg:grid grid-cols-3 relative">
        <div className="col-span-2">
          {order.order?.orderItems.map((item) => (
            <CartItem item={item} key={item._id} />
          ))}
        </div>

        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-3">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>{totalPrice}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-green-600">{discount}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>GST (18%)</span>
                <span className="text-green-600">{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery Charge</span>
                <span className="text-green-600">{deliveryCharge}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Total Amount</span>
                <span className="text-green-600">{totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              variant="contained"
              className="w-full mt-5"
              sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#9155fd" }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;