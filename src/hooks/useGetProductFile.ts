import React from "react";
import firebase from "../config/Firebase";

const useGetProductFile = (id?: string) => {
  const [productFile, setProductFile] = React.useState<Record<string, any>>();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      try {
        if (id) {
          setLoading(true);
          const result = await firebase.getProductFile(id);
          if (result.exists()) {
            setProductFile({ ...result.data(), id: result.id });
            setLoading(false);
          } else {
            setError("Product file not found");
          }
        }
      } catch (error: any) {
        setLoading(false);
        setError(error?.message || "Something went wrong");
      }
    })();
  }, [id]);

  return { productFile, loading, error };
};

export default useGetProductFile;
