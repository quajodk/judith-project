import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useCryptoPaymentConfirmation = (event_id?: string) => {
  const [loading, setLoading] = useState(false);
  const [shouldRetry, setShouldRetry] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const retryConfirmation = useCallback(() => {
    if (event_id) {
      setLoading(true);
      (async () => {
        try {
          const result = await axios.get(
            `https://us-central1-vendor-listing-shop.cloudfunctions.net/get_event/${event_id}`
          );
          if (result.data.success) {
            setData(result.data);
          }
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [event_id]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const result = await axios.get(
          "https://us-central1-vendor-listing-shop.cloudfunctions.net/get_event_response"
        );
        if (result.data.success) {
          setData(result.data.data);
        }
      } catch (error: any) {
        const { response } = error;
        const { data } = response;
        if (data.message === "charge pending confirmation")
          setShouldRetry(true);
        setError(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, error, data, retryConfirmation, shouldRetry };
};

export default useCryptoPaymentConfirmation;
