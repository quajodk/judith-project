import React from "react";
import { Link } from "react-router-dom";
import { removeFromCart, toggleCart } from "../redux/actions/appActions";
import { useAppDispatch } from "../redux/hooks";
import { ICartItem } from "../utils/models";

interface Props {
  cartItem: ICartItem;
}

const CartItemProduct = (props: Props) => {
  const dispatch = useAppDispatch();
  const { cartItem } = props;
  const { product } = cartItem;
  return (
    <>
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link
                to={"/product/" + product.id}
                onClick={() => dispatch(toggleCart())}
              >
                {product.title}
              </Link>
            </h3>
            <p className="ml-4">GHS {product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <p className="text-gray-500">Qty {cartItem.quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => dispatch(removeFromCart(product))}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItemProduct;
