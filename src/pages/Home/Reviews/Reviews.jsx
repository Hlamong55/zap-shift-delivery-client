import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div className="my-16">
      <h3 className="text-secondary text-4xl font-bold text-center mb-3">
        What our customers are sayings
      </h3>
      <p className="text-text text-center font-semibold">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce <br /> pain, and strengthen your body
        with ease!
      </p>

      <>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 1,
            slideShadows: true,
          }}
          autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
           {
            reviews.map(review => 
            <SwiperSlide>
                <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>)
           }
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
