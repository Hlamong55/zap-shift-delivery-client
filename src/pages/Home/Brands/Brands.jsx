import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import amazon from "../../../assets/brands/amazon.png";
import amzVector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import startProple from "../../../assets/brands/start_people.png";
import dhl from "../../../assets/brands/dhl-express-logo-png-transparent.png";
// import fedx from "../../../assets/brands/Fedex-Logo-Transparent-PNG.png";
import blue from "../../../assets/brands/blue_dart_express-logo_brandlogos.net_mqv69-768x122.png"
import { Autoplay } from "swiper/modules";

const brandLogos = [
  amazon,
  casio,
  moonstar,
  amzVector,
  dhl,
  randstad,
  star,
  startProple,
  // fedx,
  blue
];

const Brands = () => {
  return (
    <div className="py-20">
        <h3 className="mb-10 text-center text-2xl font-extrabold text-secondary">We've helped thousands of sales teams</h3>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {brandLogos.map((logo) => (
          <SwiperSlide>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
