import React from "react";
import { useHistory } from "react-router-dom";
import { addToCart } from "../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IProduct } from "../utils/models";

interface Props {
  product: IProduct;
}

const ProductCard = (props: Props) => {
  const { countryCode, exchangeRate } = useAppSelector((state) => state.app);
  const { product } = props;
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <div key={product.id}>
      <div
        className="relative cursor-pointer"
        onClick={() => history.push("/product/" + product.id)}
      >
        <div className="relative w-full h-72 rounded-lg overflow-hidden">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="relative mt-4 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900 pb-2">
            {product.title}
          </h3>
          <span className="text-base font-semibold text-gray-500 flex space-x-2">
            {countryCode.toLowerCase() !== "gh" ? "$" : product?.currency}
            {countryCode.toLowerCase() !== "gh"
              ? product.price / exchangeRate
              : product.price}
          </span>
          <span
            className={`mt-1 text-xs text-gray-500 p-0.5 ${
              product.isAvailable ? "bg-green-300" : "bg-yellow-300"
            } max-w-max rounded-sm`}
          >
            {product.isAvailable ? "Available" : "Out of stock"}
          </span>
        </div>
        {/* <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
          />
          <p className="relative text-lg font-semibold text-white space-x-1">
            {product?.currency}
            {product.price}
          </p>
        </div> */}
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="relative flex bg-purple-200 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-purple-300 w-full"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to cart<span className="sr-only">, {product.title}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
