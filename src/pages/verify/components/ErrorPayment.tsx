import React from "react";
import { ReactComponent as Error } from "../../../assets/images/payment-error.svg";

type Props = {
  error: any;
  retryFn: () => void;
};

const ErrorPayment = ({ error, retryFn }: Props) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <Error className="h-36 w-36" />
      <span className="my-2 text-gray-600 text-semibold text-sm">
        Sorry could not verify payment.
      </span>
      <span className="my-2 text-gray-400 text-semibold text-xs">
        {error?.message}
      </span>
      <button
        className="text-purple-800 text-semibold text-sm bg-purple-400"
        onClick={retryFn}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPayment;
