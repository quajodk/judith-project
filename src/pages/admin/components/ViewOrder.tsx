import _ from "lodash";
import React from "react";

type Props = {
  closeModal?: () => void;
  order: Record<string, any>;
};

const ViewOrder = ({ closeModal, order }: Props) => {
  return (
    <div className="flex flex-col space-y-3">
      {order?.products.map(
        ({ product, quantity }: Record<string, any>, idx: number) => (
          <div key={idx} className="flex-1 p-2 bg-gray-100 my-2 rounded-md">
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

                <span className="mt-1 text-xs text-gray-500 flex space-x-1">
                  Quantity {quantity}
                </span>
              </div>
            </div>
          </div>
        )
      )}

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Order qty</span>
        <span className="text-gray-700 text-sm font-semibold flex items-center">
          {order?.products.reduce(
            (acc: number, { quantity }: any) => acc + quantity,
            0
          )}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Order total</span>
        <span className="text-gray-700 text-sm font-semibold flex items-center">
          {order?.currency}
          {order?.totalAmount}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Order status</span>
        <span className="text-gray-700 rounded-md p-1 bg-gray-100 text-xs">
          {_.startCase(_.toLower(order?.orderStatus))}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">
          Payment method
        </span>
        <span className="text-gray-700 text-sm font-semibold">
          {_.startCase(order?.paymentMethod)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">
          Payment status
        </span>
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
            order?.paymentStatus === "success"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {_.startCase(_.toLower(order?.paymentStatus))}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium">Order date</span>
        <span className="text-gray-700 text-sm font-semibold">
          {new Date(order?.date).toLocaleString("en-GB")}
        </span>
      </div>

      <div className="flex flex-col border-t-2 border-gray-200 space-y-2 py-3">
        <span className="font-medium text-sm">
          {_.startCase(order?.customer?.name)}
        </span>
        <span className="text-xs">{order?.customer?.email}</span>
      </div>

      <div className="flex justify-end items-center pt-12 pb-4 space-x-3">
        <button
          type="button"
          className="flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 text-gray-600 bg-gray-100"
          onClick={closeModal && closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewOrder;
