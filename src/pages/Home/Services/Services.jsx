import React from "react";

const Services = () => {

  const services = [
    {
      title: "Express & Standard Delivery",
      desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      icon: "📦",
      highlight: true
    },
    {
      title: "Nationwide Delivery",
      desc: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      icon: "🚚",
      highlight: true,
    },
    {
      title: "Fulfillment Solution",
      desc: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      icon: "🏬",
      highlight: true
    },
    {
      title: "Cash on Home Delivery",
      desc: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      icon: "💰",
      highlight: true
    },
    {
      title: "Corporate Service / Contract In Logistics",
      desc: "Customized corporate services which includes warehouse and inventory management support.",
      icon: "🏢",
      highlight: true
    },
    {
      title: "Parcel Return",
      desc: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      icon: "↩️",
      highlight: true
    },
  ];

  return (
    <section className="w-full bg-secondary py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-2">Our Services</h2>
      <p className="text-white/80 text-center max-w-2xl mb-12">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-2.5 mx-auto">
        {services.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl py-8 px-6 bg-white text-center shadow transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
              s.highlight ? "bg-primary hover:bg-primary" : "hover:bg-gray-50"
            }`}
          >
            <div className="text-5xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-secondary">{s.title}</h3>
            <p className="text-text text-sm font-medium leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
