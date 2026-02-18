import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });




  if (!parcel) {
    return (
      <h2 className="text-center py-20 text-2xl font-extrabold">
        Please Wait...
      </h2>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  console.log("parcel =", parcel);
  console.log("cost =", parcel?.cost);



  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel?.cost,
      parcelName: parcel?.parcelName,
      parcelId: parcel?._id,
      senderEmail: parcel?.senderEmail,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);
    window.location.href = res.data.url;
  };




  return (
    <div>
      <h3>Please Pay For: {parcel?.parcelName}</h3>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
