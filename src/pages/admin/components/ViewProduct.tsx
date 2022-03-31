import React from "react";
import { useHistory } from "react-router-dom";
import { IProduct } from "../../../utils/models";

type Props = {
  product: IProduct;
  closeModal?: () => void;
};

const ViewProduct = ({ product, closeModal }: Props) => {
  const history = useHistory();
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex-1 p-2 bg-gray-100 my-2 rounded-md">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-16 w-16 rounded-md"
              src={product?.imageSrc}
              alt=""
            />
          </div>
          <div className="ml-6 w-0 flex-1 flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {product?.title}
            </span>

            <span className="mt-1 text-xs text-gray-500 flex space-x-1">
              {product?.currency} {product?.price}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <span className="text-gray-400 text-sm font-medium">Description</span>
        <span className="text-gray-700 text-sm font-semibold">
          {product?.description}
        </span>
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400 text-sm font-medium">Categories</span>
        {product?.category?.map((category, idx) => (
          <span key={idx} className="text-gray-700 text-sm font-semibold">
            {category}
          </span>
        ))}
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400 text-sm font-medium">Tags</span>
        <div className="flex space-x-2">
          {product?.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-gray-700 rounded-md p-1 bg-gray-100 text-sm font-semibold"
            >
              {tag?.value}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400 text-sm font-medium">Created on</span>
        <span className="text-gray-700 text-sm font-semibold">
          {product?.createdAt}
        </span>
      </div>

      <div className="flex justify-end items-center pt-12 pb-4 space-x-3">
        <button
          type="button"
          className="flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-gray-600 bg-gray-100"
          onClick={closeModal && closeModal}
        >
          Close
        </button>
        <button
          type="button"
          className="flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-white bg-blue-600"
          onClick={() => history.push(`/admin/en/products/edit/${product.id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default ViewProduct;
