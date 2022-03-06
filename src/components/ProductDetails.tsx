import { XIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import { useHistory, useParams } from "react-router-dom";
import useGetProduct from "../hooks/useGetProduct";
import { addToCart } from "../redux/actions/appActions";
import { useAppDispatch } from "../redux/hooks";

export default function ProductDetails() {
  const dispatch = useAppDispatch();
  const id = useParams<{ id: string }>().id;
  const { loading, product, error } = useGetProduct(id);
  const history = useHistory();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li onClick={() => history.goBack()}>
                <div className="flex items-center text-sm">
                  <div className="font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                    Home
                  </div>

                  <svg
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                </div>
              </li>
              <li>
                <div className="flex items-center text-sm">
                  <div className="font-light text-gray-500">
                    {product?.title}
                  </div>
                </div>
              </li>
            </ol>
          </nav>
          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product?.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {product?.currency} {product?.price}
              </p>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product?.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              {product?.isAvailable ? (
                <CheckIcon
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <XIcon className="flex-shrink-0 w-5 h-5 text-red-500" />
              )}
              <p className="ml-2 text-sm text-gray-500">
                {product?.isAvailable
                  ? "In stock and ready to ship"
                  : "Out of stock"}
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={product?.imageSrc}
              alt={product?.imageAlt}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <div className="mt-10">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                onClick={
                  product ? () => dispatch(addToCart(product)) : () => null
                }
              >
                Add to cart
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
