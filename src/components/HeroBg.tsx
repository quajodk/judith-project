import React from "react";

interface Props {}

const HeroBg = (props: Props) => {
  return (
    <div className="relative">
      {/* Background image and overlap */}
      <div
        aria-hidden="true"
        className="hidden absolute inset-0 sm:flex sm:flex-col"
      >
        <div className="flex-1 relative w-full bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
              alt=""
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        {/* <div className="w-full bg-white h-32 md:h-40 lg:h-48" /> */}
      </div>

      <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
        {/* Background image and overlap */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="flex-1 relative w-full bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          {/* <div className="w-full bg-white h-48" /> */}
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Omega Vendor List
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroBg;
