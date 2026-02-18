import React from "react";
import bg from '../../../assets/be-a-merchant-bg.png';
import banner from '../../../assets/location-merchant.png'

const Merchant = () => {
  return (
    <div className="relative w-full mb-14 max-w-6xl mx-auto rounded-3xl overflow-hidden bg-secondary p-8 md:p-14 text-white flex flex-col md:flex-row items-center md:gap-10 shadow-xl">

      {/* Top Decorative Overlay Image (absolute) */}
      <img
        src={bg} // your top wave/gradient style
        alt="overlay"
        className="absolute top-0 left-0 w-full h-auto opacity-90 pointer-events-none select-none"
      />

      {/* LEFT CONTENT */}
      <div className="relative z-10 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          Merchant and Customer Satisfaction
          is Our First Priority
        </h1>

        <p className="text-gray-200 mb-6">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="px-6 py-3 bg-primary text-secondary rounded-full font-semibold shadow-md hover:text-primary hover:bg-secondary border-2 border-primary hover:shadow-xl transition-all">
            Become a Merchant
          </button>

          <button className="px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-secondary transition-all">
            Earn with ZapShift Courier
          </button>
        </div>
      </div>

      {/* RIGHT SIDE ILLUSTRATION */}
      <div className="relative z-10 flex-1 flex justify-center">
        <img
          src={banner} // your box + location image
          alt="parcel"
          className="w-[350px] hidden md:block md:w-[420px] lg:w-[480px] object-contain"
        />
      </div>
    </div>
  );
}


export default Merchant;