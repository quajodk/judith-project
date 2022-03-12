import React, { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CheckingPayment from "./components/CheckingPayment";
import ErrorPayment from "./components/ErrorPayment";
import useVerifyPayment from "./hooks/useVerifyPayment";
import { ReactComponent as PaymentDone } from "../../assets/images/payment-success.svg";
import { ReactComponent as PaymentNotOk } from "../../assets/images/payment-notok.svg";
import { orderProduct } from "../../redux/actions/appActions";
import { useAppDispatch } from "../../redux/hooks";

type Props = {};

const VerifyPayment = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const callbackLink = new URLSearchParams(location.search);
  const reference = callbackLink.get("reference") ?? "";
  const history = useHistory();
  const init = useRef({ dispatch });

  const { data, error, loading, verifyPaymentRetry } =
    useVerifyPayment(reference);

  useEffect(() => {
    const { dispatch } = init.current;
    if (data && data.data.status === "success") {
      const order = {
        ...data.data,
      };
      dispatch(orderProduct(order));
    }
  }, [data]);

  if (loading) {
    return <CheckingPayment />;
  }

  if (error) {
    return <ErrorPayment error={error} retryFn={verifyPaymentRetry} />;
  }

  console.log(data);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {data && data?.data?.status === "success" ? (
        <>
          <PaymentDone className="h-52 w-52" />
          <span className="my-2 text-green-600 text-semibold text-sm">
            Payment was successful
          </span>
          <span className="mb-2 text-gray-400 text-semibold text-xs">
            Check your mail after 3 - 5 minutes for order confirmation email.
          </span>
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center w-92"
            onClick={() => history.replace("/")}
          >
            Go to home
          </button>
        </>
      ) : (
        <>
          <PaymentNotOk className="h-52 w-52" />
          <span className="my-2 text-green-600 text-semibold text-sm">
            {data?.data?.gateway_response}
          </span>

          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center w-92"
            onClick={() => history.goBack()}
          >
            Go to back
          </button>
        </>
      )}
    </div>
  );
};

export default VerifyPayment;
