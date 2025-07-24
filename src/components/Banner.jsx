import React from "react";

const Banner = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Save big on Google products
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Discover limited-time offers across the Google Store.
          </p>
          <a
            href="#offers"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Shop offers
          </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/assets/Pixel-6.png"
            alt="Banner"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;