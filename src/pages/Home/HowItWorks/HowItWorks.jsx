import React from "react";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaTruckMoving } from "react-icons/fa";
import { GiHandTruck } from "react-icons/gi";
import { PiBuildingOfficeFill } from "react-icons/pi";

const HowItWorks = () => {
  const features = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaTruckMoving />
    },
    {
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <GiHandTruck />
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <PiBuildingOfficeFill />
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <BsMenuButtonWideFill />
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold  text-secondary text-center">How it Works</h2>
        <h3 className="text-center mb-6 text-lg font font-medium text-secondary">From order to doorstep — simple and seamless.</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition border border-gray-200"
            >
              <div className="text-5xl mb-3 text-secondary">{item.icon}</div>
              <h3 className="text-lg font-bold text-secondary mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-text leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
