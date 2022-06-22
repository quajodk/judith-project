import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { orderProduct } from "../../../redux/actions/appActions";
import { useAppDispatch } from "../../../redux/hooks";
import useCryptoPaymentConfirmation from "../hooks/useCryptoPaymentConfirmation";
import CheckingPayment from "./CheckingPayment";
import ErrorPayment from "./ErrorPayment";
import { ReactComponent as PaymentDone } from "../../../assets/images/payment-success.svg";
import { ReactComponent as PaymentNotOk } from "../../../assets/images/payment-notok.svg";
import _ from "lodash";

type Props = {};

const CryptoConfirmation = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const init = useRef({ dispatch });

  const { data, error, loading, retryConfirmation, shouldRetry } =
    useCryptoPaymentConfirmation();

  useEffect(() => {
    const { dispatch } = init.current;
    if (data && data?.success) {
      const order = {
        channel: "crypto",
        created_at: data.data.created_at,
        status: data.data.type.split(":")[1],
        currency: "btc",
        transaction_date: new Date().toISOString(),
      };
      dispatch(orderProduct(order));
    }
  }, [data]);

  if (loading) {
    return <CheckingPayment />;
  }

  if (error) {
    return (
      <ErrorPayment
        error={error}
        retryFn={shouldRetry ? retryConfirmation : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      {data && data?.success ? (
        <>
          <PaymentDone className="h-52 w-52" />
          <span className="my-2 text-green-600 text-semibold text-sm">
            Payment was successful
          </span>
          <span className="mb-2 text-gray-400 text-semibold text-xs">
            Check your mail after 3 - 5 minutes for order confirmation email.
            Check spam if you did not receive mail in your inbox.
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
          <span className="my-2 text-yellow-600 text-semibold text-sm">
            {_.startCase(data?.message)}
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

export default CryptoConfirmation;
