import React, { useEffect } from "react";
import CartItem from "./CartItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);

  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, cart.updateCartItem, cart.deleteCartItem]);

  const GST_RATE = 0.18; // 18% GST
  const totalPrice = cart.cart?.totalPrice || 0;
  const discount = cart.cart?.discount || 0;
  const discountedPrice = totalPrice - discount;
  const gstAmount = discountedPrice * GST_RATE;
  const deliveryCharge = discountedPrice < 700 ? 40 : 0;
  const totalAmount = discountedPrice + gstAmount + deliveryCharge;

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative">
        <div className="col-span-2">
          {cart.cartItems && cart.cartItems.length > 0 ? (
            cart.cartItems.map((item) => (
              <CartItem item={item}  />
              // key={item.id}
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
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
              className="w-full"
              sx={{ px: "2.5rem", py: "0.7rem", bgcolor: "#9155fd" }}
              onClick={handleCheckOut}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
