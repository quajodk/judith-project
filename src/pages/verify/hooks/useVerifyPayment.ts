import { useCallback, useEffect, useState } from "react";
import paymentService from "../../../services/payment.service";

const useVerifyPayment = (reference: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const verifyPaymentRetry = useCallback(() => {
    setLoading(true);
    paymentService
      .verifyPayment(reference)
      .then((response) => {
        setLoading(false);
        setData(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [reference]);

  useEffect(() => {
    setLoading(true);
    paymentService
      .verifyPayment(reference)
      .then((response) => {
        setLoading(false);
        setData(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [reference]);

  return { loading, error, data, verifyPaymentRetry };
};

export default useVerifyPayment;
