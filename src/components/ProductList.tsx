import { CogIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { getProducts } from "../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IProduct } from "../utils/models";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { products, lastDocRef, total } = useAppSelector((state) => state.app);

  const loadMore = () => {
    if (lastDocRef) {
      dispatch(getProducts(lastDocRef));
    }
  };

  const init = useRef({
    dispatch,
    loadMore,
  });

  useEffect(() => {
    const { dispatch, loadMore } = init.current;
    if (total === 0) {
      dispatch(getProducts());
    } else {
      loadMore();
    }
  }, [total]);

  if (products.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center">
            <CogIcon className="h-6 w-6 animate-spin text-green-500" />
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-2 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
