import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {};

const CheckingPayment = (props: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <AiOutlineLoading className="w-24 h-24 animate-spin text-green-800" />
      <span className="my-2 text-gray-600 text-semibold text-sm">
        Verifying payment ...
      </span>
    </div>
  );
};

export default CheckingPayment;
