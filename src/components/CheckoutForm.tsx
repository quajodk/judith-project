import { XIcon } from "@heroicons/react/outline";
import { /*useRef*/ useMemo, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCustomer } from "../redux/reducers/app/appReducer";
import paymentService, {
  cryptoPaymentService,
} from "../services/payment.service";
import {
  ICryptoPaymentParams,
  IOrder,
  IPaymentParams,
  IProduct,
} from "../utils/models";
import { uuid } from "uuidv4";
import { ReactComponent as Payment } from "../assets/images/payment.svg";
import { FaBitcoin, FaCreditCard } from "react-icons/fa";

interface ICheckoutItem {
  product: IProduct;
  qty: number;
}

export default function CheckoutForm() {
  const { cart, totalCartItems, countryCode } = useAppSelector(
    (state) => state.app
  );
  const history = useHistory();
  const { products, totalPrice, totalPriceUSD } = cart as IOrder;
  const [orderObj, setOrderObj] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [payWith, setPayWith] = useState("");
  const url = window.location.host;
  const protocol = window.location.protocol;
  const dispatch = useAppDispatch();

  // const expirationDateRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderObj({ ...orderObj, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const callback_url = `${protocol}//${url}/checkout/${cart?.id}/verify`;
    const payObj = {
      ...orderObj,
      callback_url,
      amount: totalPrice,
      currency: "GHS",
      reference: (cart?.id as string) + Date.now(),
      channel: countryCode !== "GH" ? ["card"] : ["card", "mobile_money"],
    };

    const paymentParams: ICryptoPaymentParams = {
      cancel_url: `${protocol}//${url}/checkout/${cart?.id}`,
      local_price: {
        amount: totalPriceUSD.toString(),
      },
      name: `Payment for ${cart?.id}`,
      redirect_url: `${protocol}//${url}/checkout/${cart?.id}/crypto`,
      metadata: {
        customer_id: orderObj?.email,
        customer_name: `${orderObj.first_name} ${orderObj.last_name}`,
      },
    };

    if (["", undefined, null].includes(orderObj?.email)) {
      setEmailError(true);
      return;
    }

    dispatch(
      setCustomer({
        email: orderObj.email,
        name: `${orderObj.first_name} ${orderObj.last_name}`,
        id: uuid(),
      })
    );

    setLoading(true);
    try {
      if (payWith === "paystack") {
        const result = await paymentService.initializePayment(
          payObj as IPaymentParams
        );
        if (result.status) {
          window.location.assign(result.data.authorization_url);
        }
      } else {
        const result = await cryptoPaymentService.chargeCrypto(paymentParams);
        console.log(
          "🚀 ~ file: CheckoutForm.tsx ~ line 92 ~ handleSubmit ~ result",
          result
        );
        if (result.data) {
          window.location.assign(result.data.hosted_url);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
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
                {countryCode !== "GH"
                  ? `$ ${cart?.totalPriceUSD ?? 0.0}`
                  : `GHS ${cart?.totalPrice ?? 0.0}`}
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
                <dd>
                  {countryCode !== "GH"
                    ? `$ ${cart?.totalPriceUSD ?? 0.0}`
                    : `GHS ${cart?.totalPrice ?? 0.0}`}
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">
                  {countryCode !== "GH"
                    ? `$ ${cart?.totalPriceUSD ?? 0.0}`
                    : `GHS ${cart?.totalPrice ?? 0.0}`}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        {!["", undefined, null].includes(payWith) ? (
          <section
            aria-labelledby="payment-and-shipping-heading"
            className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
          >
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0 mb-4">
              <span className="text-2xl">
                Pay with{" "}
                {payWith === "paystack" ? "Card or Mobile Money" : "Crypto"}
              </span>
            </div>
            <h2 id="payment-and-shipping-heading" className="sr-only">
              Pay and shipping details
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
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        autoComplete="first_name"
                        value={orderObj?.first_name}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        autoComplete="last_name"
                        value={orderObj?.last_name}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

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
                        value={orderObj?.email}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {emailError && (
                      <span className="text-red-500 text-sm mt-2">
                        Please enter your email
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-10 pt-6 flex flex-col items-center space-y-3">
                  <button
                    type="submit"
                    className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-4 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <AiOutlineLoading className="h-4 w-4 animate-spin text-white mr-2" />{" "}
                        Processing ..
                      </>
                    ) : (
                      "Pay now"
                    )}
                  </button>

                  <span
                    className="text-indigo-500 text-sm font-medium cursor-pointer mt-4"
                    onClick={() => {
                      if (payWith === "paystack") {
                        setPayWith("coinbase");
                      } else {
                        setPayWith("paystack");
                      }
                    }}
                  >
                    {payWith === "paystack"
                      ? "Pay with crypto"
                      : "Pay with card or mobile money"}
                  </span>
                </div>
              </div>
            </form>
          </section>
        ) : (
          <section
            aria-labelledby="payment-and-shipping-heading"
            className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
          >
            <div className="flex flex-col items-center space-y-3 px-4">
              <Payment className="w-80 h-80" />
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-4 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center w-full"
                onClick={() => setPayWith("paystack")}
              >
                Pay with card or mobile money{" "}
                <FaCreditCard className="h-4 w-4 ml-2" />
              </button>
              <button
                type="submit"
                className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-4 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center w-full"
                onClick={() => setPayWith("coinbase")}
              >
                Pay with crypto <FaBitcoin className="h-4 w-4 ml-2" />
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

const CheckoutItem = (props: ICheckoutItem) => {
  const { product, qty } = props;
  const { countryCode, exchangeRate } = useAppSelector((state) => state.app);
  const price = useMemo(() => {
    if (countryCode !== "GH") {
      let p = product.price / exchangeRate;
      return Number(p.toFixed(2));
    }
    return product.price;
  }, [countryCode, exchangeRate, product.price]);
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
        {countryCode !== "GH" ? `$ ${price}` : `${product?.currency} ${price}`}
      </p>
    </li>
  );
};
