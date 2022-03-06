import React from "react";
import firebase from "../config/Firebase";
import { useAppSelector } from "../redux/hooks";
import { IProduct } from "../utils/models";

const useGetProduct = (id: string) => {
  // check if product is in store
  const storeProduct = useAppSelector((state) => state.app.product);

  const [product, setProduct] = React.useState(storeProduct);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      try {
        if (!product || product?.id !== id) {
          setLoading(true);
          const result = await firebase.getProduct(id);
          if (result.exists()) {
            setProduct({ ...result.data(), id: result.id } as IProduct);
            setLoading(false);
          } else {
            setError("Product not found");
          }
        }
      } catch (error: any) {
        setError(error?.message || "Something went wrong");
      }
    })();
  }, [id, product]);

  return { product, loading, error };
};

export default useGetProduct;
