import React from "react";
import img1 from '../../../assets/live-tracking.png'
import img2 from '../../../assets/big-deliveryman.png'
import img3 from '../../../assets/safe-delivery.png'

const Features = () => {
  const features = [
    {
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: img1
    },
    {
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: img2
    },
    {
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: img3
    },
  ];

  return (
    <section className="w-full  max-w-6xl mx-auto">
      {/* dotted divider */}
      <div className="border-t border-dashed border-gray-500 pb-16"></div>

      <div className="flex flex-col gap-10">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-5 md:flex-row items-center md:gap-12"
          >
            <img
              src={f.image}
              alt={f.title}
              className="w-40 md:w-48 lg:w-52 object-contain"
            />

            <div className="hidden md:block h-36 border-l border-dashed border-gray-500"></div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-2">
                {f.title}
              </h3>
              <p className="text-text leading-relaxed text-sm font-medium md:text-base">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-500 my-14"></div>
    </section>
  );
}


export default Features;