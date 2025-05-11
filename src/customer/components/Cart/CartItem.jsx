import React from "react";
import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
    };
    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item._id));
  };

  const discountPresent = item?.price && item?.discountedPrice
  ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
  : 0;

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex item-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          {item?.product?.imageUrl && (
            <img
              className="w-full h-full object-cover object-top"
              src={item.product.imageUrl}
              alt=""
            />
          )}
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">
            Size: {item?.size}, {item?.product?.color}
          </p>
          <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p>

          <div className="flex space-x-5 item-center text-gray-900 pt-6">
            <p className="font-semibold">₹{item?.price}</p>
            <p className="opacity-50 line-through">₹{item?.discountedPrice}</p>
            <p className="font-semibold text-green-600">
            {discountPresent}% off
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton
            sx={{ color: "rgb(145 85 253)" }}
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item?.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm">{item?.quantity}</span>
          <IconButton
            sx={{ color: "rgb(145 85 253)" }}
            onClick={() => handleUpdateCartItem(1)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          <Button
            sx={{ color: "RGB(145 85 253)" }}
            onClick={handleRemoveCartItem}
          >
            remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;