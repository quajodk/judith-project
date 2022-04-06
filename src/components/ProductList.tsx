import { useEffect, useRef /*useState*/ } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { getProducts } from "../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IProduct } from "../utils/models";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { products, lastDocRef, total, fetchingProduct } = useAppSelector(
    (state) => state.app
  );

  const loadMore = () => {
    dispatch(getProducts(lastDocRef));
  };

  const init = useRef({
    loadMore,
  });

  useEffect(() => {
    if (products.length === 0) {
      init.current.loadMore();
    }
  }, [products.length]);

  console.log(total, products.length, lastDocRef);

  if (products.length === 0 && fetchingProduct) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center">
            <AiOutlineLoading className="h-10 w-10 animate-spin text-green-500" />
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0 && !fetchingProduct) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center">
            <span>No products found</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-2 gap-y-12 gap-4 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length !== total && (
          <div className="flex w-full items-center justify-center">
            <button
              type="button"
              className="bg-purple-200 rounded-md p-3 mx-auto mt-12 text-sm"
              onClick={() => loadMore()}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
