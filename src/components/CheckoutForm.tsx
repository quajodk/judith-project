import { XIcon } from "@heroicons/react/outline";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { orderProduct } from "../redux/actions/appActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCardType } from "../utils";
import { IOrder, IProduct } from "../utils/models";
import Visa from "../assets/icons/visa.png";
import Mastercard from "../assets/icons/mastercard.png";
import ConfirmPayment from "./PaymentModal";
import { setPaymentSuccess } from "../redux/reducers/app/appReducer";
import { RootState } from "../redux/store";

interface ICheckoutItem {
  product: IProduct;
  qty: number;
}

export default function CheckoutForm() {
  const [isCardValid, setIsCardValid] = useState(false);
  const [cardType, setCardType] = useState<string>();
  const { cart, totalCartItems, openCart, paymentSuccess } = useAppSelector(
    (state) => state.app
  );
  const history = useHistory();
  const { products, totalPrice } = cart as IOrder;
  const [orderObj, setOrderObj] = useState<Record<string, any>>({});
  const dispatch = useAppDispatch();

  const expirationDateRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderObj({ ...orderObj, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const today = new Date();
    const today_mm = today.getMonth() + 1;
    const today_yy = today.getFullYear() % 100;
    // console.log(today_mm, today_yy);

    var mm = parseFloat(orderObj?.expirationDate.substring(0, 2)); // get the mm portion of the expiryDate (first two characters)
    var yy = parseFloat(orderObj?.expirationDate.substring(3));
    // console.log(mm, yy);

    if (!(yy > today_yy || (yy === today_yy && mm >= today_mm))) {
      setIsCardValid(false);
      return;
    } else {
      setIsCardValid(true);
    }
    const order = {
      products,
      totalPrice,
      isCardValid,
      cardType,
      ...orderObj,
    };
    dispatch(orderProduct(order));
  };

  console.log(paymentSuccess, openCart);

  return (
    <div className="bg-white">
      <ConfirmPayment
        open={paymentSuccess}
        setOpen={() => {
          dispatch(setPaymentSuccess(!paymentSuccess));
          history.goBack();
        }}
      />
      {/* Background color split screen for large screens */}
      <div
        className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-indigo-900"
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16">
        <h1 className="sr-only">Checkout</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-indigo-900 text-indigo-300 py-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div className="absolute top-0 right-0 p-4">
              <XIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => history.goBack()}
              />
            </div>

            <dl>
              <dt className="text-sm font-medium">Amount due</dt>
              <dd className="mt-1 text-3xl font-extrabold text-white">
                ${cart?.totalPrice ?? 0}
              </dd>
            </dl>

            <ul className="text-sm font-medium divide-y divide-white divide-opacity-10">
              {products.map((x, idx) => (
                <CheckoutItem
                  product={x.product}
                  qty={x.quantity}
                  key={idx + 1}
                />
              ))}
            </ul>

            <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
              <div className="flex items-center justify-between">
                <dt>Items</dt>
                <dd>{totalCartItems ?? 0}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>${cart?.totalPrice ?? 0}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${cart?.totalPrice ?? 0}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          aria-labelledby="payment-and-shipping-heading"
          className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
        >
          <h2 id="payment-and-shipping-heading" className="sr-only">
            Payment and shipping details
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
              <div>
                <h3
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Contact information
                </h3>

                <div className="mt-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      autoComplete="email"
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Payment details
                </h3>

                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-name"
                        name="cardName"
                        autoComplete="cc-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-4">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1 relative rounded-md ">
                      <input
                        type="text"
                        id="card-number"
                        name="cardNumber"
                        autoComplete="cc-number"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pl-4 pr-12 py-3"
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(" ", "");
                          handleChange(e);
                          setCardType(getCardType(e.target.value));
                        }}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <div className="focus:ring-indigo-500 focus:border-indigo-500 pl-2 pr-3 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                          <img
                            src={
                              cardType?.toLowerCase() === "visa"
                                ? Visa
                                : cardType?.toLowerCase() === "mastercard"
                                ? Mastercard
                                : ""
                            }
                            className="h-6 w-6"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        ref={expirationDateRef}
                        type="text"
                        name="expirationDate"
                        id="expiration-date"
                        placeholder="01/21"
                        autoComplete="cc-exp"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    {!isCardValid &&
                      expirationDateRef.current?.value !== "" &&
                      expirationDateRef.current?.value !== undefined && (
                        <span className="text-xs text-red-400">
                          Card has expired!
                        </span>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  Billing information
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="state"
                        name="state"
                        autoComplete="address-level1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postalCode"
                        autoComplete="postal-code"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Pay now
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

const CheckoutItem = (props: ICheckoutItem) => {
  const { product, qty } = props;
  return (
    <li key={product.id} className="flex items-start py-6 space-x-4">
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="flex-none w-20 h-20 rounded-md object-center object-cover"
      />
      <div className="flex-auto space-y-1">
        <h3 className="text-white">{product.title}</h3>
        <p>{product.color}</p>
        <p>{qty ?? 1}</p>
      </div>
      <p className="flex-none text-base font-medium text-white">
        ${product.price}
      </p>
    </li>
  );
};
