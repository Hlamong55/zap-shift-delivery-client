import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: comment, user_photoURL } = review;

  return (
    <div className="max-w-sm my-12 p-6  bg-white rounded-xl shadow-lg border border-gray-200">
    <FaQuoteRight className="text-primary text-2xl mb-4 opacity-70" />
      <p className="text-text font-semibold leading-relaxed mb-6">{comment}</p>
      <div className="border-t border-dashed border-gray-500 my-4"></div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary shrink-0">
            <img src={user_photoURL} alt="" />
        </div>
        <div className="md:ml-4">
          <h3 className="font-bold text-lg text-secondary">{userName}</h3>
          <p className="text-gray-500 text-sm">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
