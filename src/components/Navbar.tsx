/* eslint-disable jsx-a11y/anchor-is-valid */

import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, ShoppingCartIcon, XIcon } from "@heroicons/react/outline";
import Logo from "../assets/images/logo_size.jpg";
import Cart from "./Cart";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { NavLink } from "react-router-dom";
import { toggleCart } from "../redux/actions/appActions";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { totalCartItems: cartItems, openCart } = useAppSelector(
    (state) => state.app
  );

  return (
    <div>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex px-2 lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={Logo}
                      alt="omega vendor list"
                    />
                    <img
                      className="hidden lg:block h-16 w-auto"
                      src={Logo}
                      alt="omega vendor list"
                    />
                  </div>
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <NavLink
                      exact
                      to="/"
                      className={`
                        border-transparent text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                      activeClassName="border-indigo-500"
                    >
                      Home
                    </NavLink>
                    {/* <NavLink
                      to="/clothes"
                      className={`
                        border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                      activeClassName="border-indigo-500"
                    >
                      Clothes
                    </NavLink>
                    <NavLink
                      to="/hair"
                      className={`
                         border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                      activeClassName="border-indigo-500"
                    >
                      Hair
                    </NavLink>
                    <NavLink
                      to="/others"
                      className={`border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                      activeClassName="border-indigo-500"
                    >
                      Others
                    </NavLink> */}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="lg:ml-4 flex items-center">
                  <button
                    type="button"
                    className="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                    onClick={() => dispatch(toggleCart())}
                  >
                    <span className="sr-only">View notifications</span>
                    <ShoppingCartIcon
                      className="h-6 w-6 relative"
                      aria-hidden="true"
                    />
                  </button>
                  {cartItems !== 0 && (
                    <div className="text-sm text-gray-500 bg-purple-200 p-1 rounded-full">
                      {cartItems}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
                <Disclosure.Button
                  as="a"
                  href="/"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/clothes"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Clothes
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/hair"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Hair
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/others"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Others
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Cart open={openCart} setOpen={() => dispatch(toggleCart())} />
    </div>
  );
}
