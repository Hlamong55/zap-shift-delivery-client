import { useState } from "react";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabStyles = (tab) =>
    `cursor-pointer text-lg font-semibold transition-colors duration-200 
     pb-2 ${
       activeTab === tab
         ? "text-[#6A8E1D] border-b-2 border-[#6A8E1D]"
         : "text-gray-700 hover:text-black"
     }`;

  // CONTENT FOR EACH TAB
  const content = {
    story: (
      <>
        <p className="text-gray-600 font-medium leading-8 mb-6">
          We started with a simple promise — to make parcel delivery fast, reliable,
          and stress-free. Over the years, our commitment to real-time tracking,
          efficient logistics, and customer-first service has made us a trusted
          partner for thousands. Whether it's a personal gift or a time-sensitive
          business delivery, we ensure it reaches its destination — on time, every time.
        </p>

        <p className="text-gray-600 font-medium leading-8 mb-6">
          What began as a small local delivery service has now expanded into a
          nationwide logistics network. Our team works around the clock to bring
          seamless shipment experiences to every doorstep across Bangladesh.
        </p>

        <p className="text-gray-600 font-medium leading-8">
          Today, with thousands of successful deliveries, we continue to innovate
          — offering faster routes, safer handling, and a service that customers
          can trust without hesitation.
        </p>
      </>
    ),

    mission: (
      <>
        <p className="text-gray-600 font-medium leading-8 mb-6">
          Our mission is to simplify delivery for everyone — individuals,
          e-commerce businesses, and enterprises. We believe logistics should be
          fast, transparent, and affordable without compromising safety or quality.
        </p>

        <p className="text-gray-600 font-medium leading-8 mb-6">
          We are committed to building a delivery ecosystem powered by technology:
          smarter route optimization, real-time parcel visibility, and reliable
          customer support. Every decision we make is focused on improving your
          delivery experience.
        </p>

        <p className="text-gray-600 font-medium leading-8">
          Our long-term goal is to make nationwide delivery accessible in even the
          most remote districts — connecting businesses and people with ease.
        </p>
      </>
    ),

    success: (
      <>
        <p className="text-gray-600 font-medium leading-8 mb-6">
          From our early days of serving a handful of customers, we now complete
          thousands of deliveries every day across Bangladesh. Our success comes
          from listening to our customers and improving continuously.
        </p>

        <p className="text-gray-600 font-medium leading-8 mb-6">
          Partnering with leading e-commerce platforms and small businesses has
          helped us build a robust delivery network. Our on-time delivery rate and
          excellent customer satisfaction have earned us recognition in the
          logistics industry.
        </p>

        <p className="text-gray-600 font-medium leading-8">
          Every new milestone motivates us to reach further — faster deliveries,
          smarter solutions, and a stronger commitment to excellence.
        </p>
      </>
    ),

    team: (
      <>
        <p className="text-gray-600 font-medium leading-8 mb-6">
          Behind every successful delivery, there’s a dedicated team — riders,
          customer support agents, warehouse specialists, developers, and logistics
          planners working seamlessly together.
        </p>

        <p className="text-gray-600 font-medium leading-8 mb-6">
          Our team members are trained to handle parcels with care, ensure timely
          drop-offs, and support customers with honesty and friendliness. We value
          ownership, teamwork, innovation, and empathy.
        </p>

        <p className="text-gray-600 font-medium leading-8">
          Together, we are building a delivery service that customers trust and
          employees are proud to be part of — a family driven by purpose and passion.
        </p>
      </>
    ),
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Heading */}
      <h1 className="text-6xl font-extrabold text-secondary mb-4">About Us</h1>
      <p className="text-gray-600 text-lg font-medium max-w-3xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on time,
        every time.
      </p>

      <hr className="my-10" />

      {/* Tabs */}
      <div className="flex gap-10 mb-10">
        <span className={tabStyles("story")} onClick={() => setActiveTab("story")}>
          Story
        </span>
        <span className={tabStyles("mission")} onClick={() => setActiveTab("mission")}>
          Mission
        </span>
        <span className={tabStyles("success")} onClick={() => setActiveTab("success")}>
          Success
        </span>
        <span className={tabStyles("team")} onClick={() => setActiveTab("team")}>
          Team & Others
        </span>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl">{content[activeTab]}</div>
    </div>
  );
};

export default AboutUs;
