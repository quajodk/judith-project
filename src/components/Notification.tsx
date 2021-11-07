import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { ADD_TO_CART } from "../utils/constants";
import { useAppDispatch } from "../redux/hooks";
import { closeNotification, toggleCart } from "../redux/actions/appActions";

interface NotificationProps {
  message?: Record<string, any>;
  show: boolean;
  setShow: () => void;
}

export default function Notification({
  message,
  show,
  setShow,
}: NotificationProps) {
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-20"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                {message?.type === ADD_TO_CART && message && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-md"
                        src={message?.message.imageSrc}
                        alt={message?.message.imageAlt}
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {message?.message.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Just added to your cart
                      </p>
                      <div className="mt-4 flex">
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            dispatch(closeNotification());
                            dispatch(toggleCart());
                          }}
                        >
                          View Cart
                        </button>
                        <button
                          type="button"
                          className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => {
                            setShow();
                          }}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShow();
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
