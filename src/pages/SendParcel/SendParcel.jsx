import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const allRegions = serviceCenters.map((c) => c.region);
  const regions = [...new Set(allRegions)];
  //   console.log(regions)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();


  const [isDocument, setIsDocument] = useState(true);

  // for district call back
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

//   form submit
  const onSubmit = (data) => {
    data.isDocument = isDocument;
    console.log("Parcel Data:", { isDocument, ...data });

    // cost calculation
    const isDoc = data.isDocument === true;

    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDoc) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;

    Swal.fire({
      title: `Total Cost is ${cost}`,
      text: "Are you want to confirm it?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm & Proceed to Pay !",
    }).then((result) => {
      if (result.isConfirmed) {

        // save the parcel into the database
        axiosSecure.post('/parcels', data)
        .then(res => {
            console.log('after saving parcel', res.data);
            navigate('/dashboard/my-parcels')
            if(res.data.insertedId){
              Swal.fire({
              position: "center",
              icon: "success",
              title: "Your parcel has been created",
              showConfirmButton: false,
              timer: 2000
              });
            }
          })

      }
    });

  };

  return (
    <div className="min-h-screen bg-white py-12 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary mb-8">
          Send Parcel
        </h1>

        <hr className="border-gray-200 mb-8" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section heading */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Enter your parcel details
            </h2>

            {/* Document toggle */}
            <div className="flex items-center gap-8 mb-6">
              <button
                type="button"
                onClick={() => setIsDocument(true)}
                className={`flex items-center gap-3 px-2 py-1 cursor-pointer rounded-full transition
                  ${isDocument ? "bg-white" : "bg-white"}`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 transition flex items-center justify-center
                    ${
                      isDocument
                        ? "border-4 border-primary bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                >
                  {isDocument && (
                    <span className="w-2 h-2 rounded-full bg-green-500 block" />
                  )}
                </span>
                <span
                  className={`${
                    isDocument ? "text-gray-800 font-medium" : "text-gray-600"
                  }`}
                >
                  Document
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsDocument(false)}
                className={`flex items-center gap-3 px-2 py-1 cursor-pointer rounded-full transition`}
              >
                <span
                  className={`w-5 h-5 rounded-full border-2 transition flex items-center justify-center
                    ${
                      !isDocument
                        ? "border-4 border-primary bg-green-50"
                        : "border-gray-300 bg-white"
                    }`}
                >
                  {!isDocument && (
                    <span className="w-2 h-2 rounded-full bg-green-500 block" />
                  )}
                </span>
                <span
                  className={`${
                    !isDocument ? "text-gray-800 font-medium" : "text-gray-600"
                  }`}
                >
                  Not-Document
                </span>
              </button>
            </div>

            {/* Parcel name + weight */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <label className=" font-medium block mb-2">Parcel Name</label>
                <input
                  {...register("parcelName", { required: true })}
                  placeholder="Parcel Name"
                  className="w-full h-12 rounded-md border border-gray-200 px-4 placeholder-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.parcelName && (
                  <p className="text-red-500 text-sm mt-1">
                    Parcel name is required
                  </p>
                )}
              </div>

              <div>
                <label className=" font-medium block mb-2">
                  Parcel Weight (KG)
                </label>
                <input
                  {...register("parcelWeight", { required: true })}
                  type="number"
                  step="0.01"
                  placeholder="Parcel Weight (KG)"
                  className="w-full h-12 rounded-md border border-gray-200 px-4 placeholder-gray-400 focus:outline-none focus:ring-0"
                />
                {errors.parcelWeight && (
                  <p className="text-red-500 text-sm mt-1">
                    Parcel weight is required
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sender & Receiver block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Sender */}
            <div>
              <h3 className="text-lg font-bold text-secondary mb-6">
                Sender Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-medium mb-2 block">Sender Name</label>
                  <input
                    {...register("senderName")}
                    placeholder="Sender Name"
                    defaultValue={user?.displayName}
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">Sender Email</label>
                  <input
                    {...register("senderEmail")}
                    placeholder="Sender Email"
                    defaultValue={user?.email}
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-medium mb-2 block">Address</label>
                  <input
                    {...register("senderAddress")}
                    placeholder="Address"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Sender Contact No
                  </label>
                  <input
                    {...register("senderContact")}
                    placeholder="Sender Contact No"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="mb-4 space-y-4">
                {/* Region */}
                <label className="font-medium mb-2 block">Sender Region</label>
                <select
                  defaultValue="Select your region"
                  {...register("senderRegion")}
                  className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
                >
                  <option disabled={true}>Select your region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* District */}
                <label className="font-medium mb-2 block">
                  Sender District
                </label>
                <select
                  defaultValue="Select your district"
                  {...register("senderDistrict")}
                  className="w-full h-10 rounded-md border border-gray-200 px-3 bg-white"
                >
                  <option disabled={true}>Select your district</option>
                  {districtsByRegion(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium mb-2 block">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickupInstruction")}
                  rows={4}
                  placeholder="Pickup Instruction"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h3 className="text-lg font-bold text-secondary mb-6">
                Receiver Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-medium mb-2 block">
                    Receiver Name
                  </label>
                  <input
                    {...register("receiverName")}
                    placeholder="Receiver Name"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Receiver Email
                  </label>
                  <input
                    {...register("receiverEmail")}
                    placeholder="Receiver Email"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-medium mb-2 block">
                    Receiver Address
                  </label>
                  <input
                    {...register("receiverAddress")}
                    placeholder="Address"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="font-medium mb-2 block">
                    Receiver Contact No
                  </label>
                  <input
                    {...register("receiverContact")}
                    placeholder="Receiver Contact No"
                    className="w-full h-10 rounded-md border border-gray-300 px-3 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="mb-4 space-y-4">
                {/* receiver region */}
                <label className="font-medium mb-2 block">
                  Receiver Region
                </label>
                <select
                  defaultValue="Select your region"
                  {...register("receiverRegion")}
                  className="w-full h-10 rounded-md border border-gray-300 px-3 bg-white"
                >
                  <option disabled={true}>Select your region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                {/* receiver district */}
                <label className="font-medium mb-2 block">
                  Receiver District
                </label>
                <select
                  defaultValue="Select your district"
                  {...register("receiverDistrict")}
                  className="w-full h-10 rounded-md border border-gray-300 px-3 bg-white "
                >
                  <option disabled={true}>Select your district</option>
                  {districtsByRegion(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-medium mb-2 block">
                  Delivery Instruction
                </label>
                <textarea
                  {...register("deliveryInstruction")}
                  rows={4}
                  placeholder="Delivery Instruction"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Note + Button */}
          <div className="flex flex-col items-center  md:items-start  gap-6">
            <p className="font-medium text-lg">* PickUp Time 4pm-7pm Approx.</p>

            <div className="md:w-1/3">
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-primary hover:bg-green-500 hover:text-white transition font-semibold text-black"
              >
                Proceed to Confirm Booking
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
